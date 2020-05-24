
import { User } from "../types/user.ts";
import createId from "../services/createId.ts";

import { fetchData, persistData } from "./db.ts";
import { selectAll } from './psql.ts';

type UserData = Pick<User, "name" | "role" | "jiraAdmin">;

export const getUsersService = async (): Promise<User[]> => {
    let users = await selectAll();
    return users;
};

export const getUserService = async (userId: string): Promise<User | undefined> => {
    const users = await fetchData();
    return users.find(({ id }) => id === userId);
};

export const createUserService = async (userData: UserData): Promise<string> => {
    const users = await fetchData();

    const newUser: User = {
        id: createId(),
        name: String(userData.name),
        role: String(userData.role),
        jiraAdmin: "jiraAdmin" in userData ? Boolean(userData.jiraAdmin) : false,
        added: new Date()
    };

    await persistData([...users, newUser]);

    return newUser.id;
};

export const updateUserService = async (
    userId: string,
    userData: UserData
): Promise<void> => {
    const user = await getUserService(userId);

    if (!user) {
        throw new Error("User not found");
    }

    const updatedUser = {
        ...user,
        name: userData.name !== undefined ? String(userData.name) : user.name,
        role: userData.role !== undefined ? String(userData.role) : user.role,
        jiraAdmin:
        userData.jiraAdmin !== undefined
            ? Boolean(userData.jiraAdmin)
            : user.jiraAdmin
    };

    const users = await fetchData();
    const filteredUsers = users.filter(user => user.id !== userId);

    persistData([...filteredUsers, updatedUser]);
};

export const deleteUserService = async (userId: string): Promise<void> => {
    const users = await getUsersService();
    const filteredUsers = users.filter(user => user.id !== userId);

    persistData(filteredUsers);
};
