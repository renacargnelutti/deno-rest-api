
import client from "../db/database.js";
import { User } from "../types/user.ts";

export const selectAll = async (): Promise<User[]> => {
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
