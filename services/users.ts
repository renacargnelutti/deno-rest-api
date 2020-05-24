
import { User } from "../types/user.ts";
import createId from "../services/createId.ts";

import {
    getUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser,
} from './psql.ts';

export const getUsersService = async (): Promise<User[]> => {
    let users = await getUsers();
    return users;
};

export const getUserService = async (userId: string): Promise<User | null> => {
    let user = await getUser(userId);
    return user;
};

export const createUserService = async (userData: any): Promise<void> => {
    const newUser: User = {
        id: createId(),
        name: String(userData.name),
        role: String(userData.role),
        jiraAdmin: "jiraAdmin" in userData ? Boolean(userData.jiraAdmin) : false,
        added: new Date(),
    };

    await addUser(userData);
};

export const updateUserService = async (
    userId: string,
    userData: any
): Promise<void> => {
    const user = await getUserService(userId);

    if (!user) throw new Error("User not found");

    const updatedUser = {
        ...user,
        name: userData.name !== undefined ? String(userData.name) : user.name,
        role: userData.role !== undefined ? String(userData.role) : user.role,
        jiraAdmin: (userData.jiraAdmin !== undefined) ? Boolean(userData.jiraAdmin) : user.jiraAdmin,
    };

    await updateUser(updatedUser, userId);
};

export const deleteUserService = async (userId: string): Promise<void> => {
    const user = await getUserService(userId);

    if (!user) throw new Error("User not found");

    await deleteUser(userId);
};
