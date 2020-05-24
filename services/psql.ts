
import client from "../db/database.js";
import { User } from "../types/user.ts";

export const getUsers = async (): Promise<User[]> => {
    let users: any[] = [];
    let data = await client.query("SELECT * FROM users ORDER BY name");

    data.rows.map((dbuser: any) => {
        let user: any = {};

        for (let i = 0; i < dbuser.length; i++) {
            user[data.rowDescription.columns[i].name] = dbuser[i];
        }

        users.push(user);
    });

    return users;
};

export const getUser = async (userId: string): Promise<User | null> => {
    let user: any = {};
    let data = await client.query("SELECT * FROM users WHERE id = $1", userId);

    data.rows.map((dbuser: any) => {
        for (let i = 0; i < dbuser.length; i++) {
            user[data.rowDescription.columns[i].name] = dbuser[i];
        }
    });

    user = (Object.keys(user).length) ? user : null;

    return user;
};

export const addUser = async (user: any): Promise<void> => {
    await client?.query(
        "INSERT INTO users (name, role, jiraAdmin, added) VALUES ($1, $2, $3, $4)",
        user.name,
        user.role,
        user.jiraAdmin,
        new Date().toISOString(),
    );
};

export const updateUser = async (user: any, id: string): Promise<void> => {
    let query = `UPDATE users `;
    let hasSet = false;

    if (typeof user.name !== undefined) {
        query += ` SET name = '${user.name}'`;
        hasSet = true;
    }

    if (typeof user.role !== undefined) {
        if (!hasSet) query += " SET ";
        else query += ','

        query += ` role = '${user.role}'`;
        hasSet = true;
    }

    if (typeof user.jiraAdmin !== undefined) {
        if (!hasSet) query += " SET ";
        else query += ','

        query += ` jiraAdmin = '${user.jiraAdmin}'`;
    }

    query += ` WHERE id = ${id}`;

    await client?.query(query);
};

export const deleteUser = async (id: string): Promise<void> => {
    await client?.query(
        'DELETE FROM users WHERE id=$1',
        id
    );
};
