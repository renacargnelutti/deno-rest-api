
import {
    getUserService,
    getUsersService,
    createUserService,
    updateUserService,
    deleteUserService
} from "../services/users.ts";

export const getUsers = async ({ response, request }: { response: any, request: any }) => {
    try {
        const db = request.url.searchParams.get('db');
        let users = await getUsersService(db);

        response.status = 200;
        response.body = { success: true, users };
    }
    catch (err) {
        response.status = 500;
        response.body = { success: false };
    }
};

export const getUserDetails = async ({ params, response, request }: { params: any, response: any, request: any }) => {
    try {
        const db = request.url.searchParams.get('db');
        const userId = params.id;

        if (!userId) {
            response.status = 400;
            response.body = { message: "Bad request" };
            return;
        }

        const foundUser = await getUserService(userId, db);
        if (!foundUser) {
            response.status = 404;
            response.body = { message: `User not found` };
            return;
        }

        response.satus = 200;
        response.body = { success: true, user: foundUser };
    }
    catch (err) {
        response.status = 500;
        response.body = { success: false };
    }
};

export const createUser = async ({ request, response }: { request: any, response: any }) => {
    try {
        const db = request.url.searchParams.get('db');

        if (!request.hasBody) {
            response.status = 400;
            response.body = { message: "Invalid user data" };
            return;
        }

        const {
            value: { name, role, jiraAdmin }
        } = await request.body();

        if (!name || !role) {
            response.status = 400;
            response.body = { message: "Bad request" };
            return;
        }

        await createUserService({ name, role, jiraAdmin }, db);

        response.status = 200;
        response.body = { success: true };
    }
    catch (err) {
        response.status = 500;
        response.body = { success: false };
    }
};

export const updateUser = async ({ params, request, response }: { params: any, request: any, response: any }) => {
    try {
        const db = request.url.searchParams.get('db');
        const userId = params.id;

        if (!userId) {
            response.status = 400;
            response.body = { message: "Invalid user id" };
            return;
        }

        if (!request.hasBody) {
            response.status = 400;
            response.body = { message: "Invalid user data" };
            return;
        }

        const {
            value: { name, role, jiraAdmin }
        } = await request.body();

        await updateUserService(userId, { name, role, jiraAdmin }, db);

        response.status = 200;
        response.body = { success: true, message: "User updated" };
    }
    catch (err) {
        response.status = 500;
        response.body = { success: false };
    }
};

export const deleteUser = async ({ params, response, request }: { params: any, response: any, request: any }) => {
    try {
        const db = request.url.searchParams.get('db');
        const userId = params.id;

        if (!userId) {
            response.status = 400;
            response.body = { message: "Invalid user id" };
            return;
        }

        const foundUser = await getUserService(userId, db);
        if (!foundUser) {
            response.status = 404;
            response.body = { message: `User not found` };
            return;
        }

        await deleteUserService(userId, db);

        response.status = 200;
        response.body = { success: true, message: "User deleted" };
    }
    catch (err) {
        response.status = 500;
        response.body = { success: false };
    }
};
