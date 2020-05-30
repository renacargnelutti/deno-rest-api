
import { MongoClient } from "https://deno.land/x/mongo@v0.7.0/mod.ts";

import { User } from "../types/user.ts";

const client = new MongoClient();
client.connectWithUri("mongodb://admin_user:admin_password@localhost:27018");

const db = client.database("test_database");
const users = db.collection("users");

export const mongoGetUsers = async (): Promise<User[]> => {
    const allUsers = await users.find({});
    return allUsers;
};

export const mongoGetUser = async (userId: string): Promise<User | null> => {
    let user = null;
    user = await users.findOne({ _id: userId });

    return user;
};

export const mongoAddUser = async (user: any): Promise<void> => {
    await users.insertOne({
        name: user.name,
        role: user.role,
        jiraAdmin: user.jiraAdmin,
        added: new Date(),
    });
};

export const mongoUpdateUser = async (user: any, id: string): Promise<void> => {
    await users.updateOne(
        { _id: id },
        { $set: { ...user } },
    );
};

export const mongoDeleteUser = async (id: string): Promise<void> => {
    await users.deleteOne({ _id: id });
};
