
import {
    getUserService,
    getUsersService,
    createUserService,
    updateUserService,
    deleteUserService
} from "../services/users.ts";

export const getUsers = async ({ response }: { response: any }) => {
    try {
        let users = await getUsersService();

        response.status = 200;
        response.body = { success: true, users };
    }
    catch (err) {
        response.status = 500;
        response.body = { success: false };
    }
};

export const getUserDetails = async ({ params, response }: { params: any, response: any }) => {
    try {
        const userId = params.id;

        if (!userId) {
            response.status = 400;
            response.body = { message: "Bad request" };
            return;
        }

        const foundUser = await getUserService(userId);
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

        await createUserService({ name, role, jiraAdmin });

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

        await updateUserService(userId, { name, role, jiraAdmin });

        response.status = 200;
        response.body = { success: true, message: "User updated" };
    }
    catch (err) {
        response.status = 500;
        response.body = { success: false };
    }
};

export const deleteUser = async ({ params, response }: { params: any, response: any }) => {
    try {
        const userId = params.id;

        if (!userId) {
            response.status = 400;
            response.body = { message: "Invalid user id" };
            return;
        }

        const foundUser = await getUserService(userId);
        if (!foundUser) {
            response.status = 404;
            response.body = { message: `User not found` };
            return;
        }

        await deleteUserService(userId);

        response.status = 200;
        response.body = { success: true, message: "User deleted" };
    }
    catch (err) {
        response.status = 500;
        response.body = { success: false };
    }
};
