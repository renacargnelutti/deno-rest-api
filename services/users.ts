
import { User } from "../types/user.ts";
import createId from "../services/createId.ts";

import {
    psqlGetUser,
    psqlGetUsers,
    psqlAddUser,
    psqlUpdateUser,
    psqlDeleteUser,
} from './psql.ts';

import {
    mongoGetUser,
    mongoGetUsers,
    mongoAddUser,
    mongoUpdateUser,
    mongoDeleteUser,
} from './mongodb.ts';

export const getUsersService = async (db: string): Promise<User[]> => {
    let users: any[] = [];

    if (typeof db !== 'undefined' && db === 'mongo') users = await mongoGetUsers();
    else users = await psqlGetUsers();

    return users;
};

export const getUserService = async (userId: string, db: string): Promise<User | null> => {
    let user = null;

    if (typeof db !== 'undefined' && db === 'mongo') user = await mongoGetUser(userId);
    else user = await psqlGetUser(userId);

    return user;
};

export const createUserService = async (userData: any, db: string): Promise<void> => {
    const newUser: User = {
        id: createId(),
        name: String(userData.name),
        role: String(userData.role),
        jiraAdmin: "jiraAdmin" in userData ? Boolean(userData.jiraAdmin) : false,
        added: new Date(),
    };

    if (typeof db !== 'undefined' && db === 'mongo') await mongoAddUser(userData);
    else await psqlAddUser(userData);
};

export const updateUserService = async (
    userId: string,
    userData: any,
    db: string,
): Promise<void> => {
    const user = await getUserService(userId, db);

    if (!user) throw new Error("User not found");

    const updatedUser = {
        ...user,
        name: userData.name !== undefined ? String(userData.name) : user.name,
        role: userData.role !== undefined ? String(userData.role) : user.role,
        jiraAdmin: (userData.jiraAdmin !== undefined) ? Boolean(userData.jiraAdmin) : user.jiraAdmin,
    };

    if (typeof db !== 'undefined' && db === 'mongo') await mongoUpdateUser(userData, userId);
    else await psqlUpdateUser(updatedUser, userId);
};

export const deleteUserService = async (userId: string, db: string): Promise<void> => {
    const user = await getUserService(userId, db);

    if (!user) throw new Error("User not found");

    if (typeof db !== 'undefined' && db === 'mongo') await mongoDeleteUser(userId);
    else await psqlDeleteUser(userId);
};
