
import {
    getUserService,
    getUsersService,
    createUserService,
    updateUserService,
    deleteUserService
} from "../services/users.ts";

// TODO: add try and catch!

export const getUsers = async ({ response }: { response: any }) => {
    let users = await getUsersService();

    response.status = 200;
    response.body = { users };
};

export const getUserDetails = async ({ params, response }: { params: any, response: any }) => {
    const userId = params.id;

    if (!userId) {
        response.status = 400;
        response.body = { message: "Invalid user id" };
        return;
    }

    const foundUser = await getUserService(userId);
    if (!foundUser) {
        response.status = 404;
        response.body = { message: `User with ID ${userId} not found` };
        return;
    }

    response.satus = 200;
    response.body = foundUser;
};

export const createUser = async ({ request, response }: { request: any, response: any }) => {
    if (!request.hasBody) {
        response.status = 400;
        response.body = { message: "Invalid user data" };
        return;
    }

    const {
        value: { name, role, jiraAdmin }
    } = await request.body();

    if (!name || !role) {
        response.status = 422;
        response.body = { message: "Incorrect user data. Name and role are required" };
        return;
    }

    const userId = await createUserService({ name, role, jiraAdmin });

    response.status = 200;
    response.body = { message: "User created", userId };
};

export const updateUser = async ({ params, request, response }: { params: any, request: any, response: any }) => {
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
    response.body = { message: "User updated" };
};

export const deleteUser = async ({ params, response }: { params: any, response: any }) => {
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
    response.body = { message: "User deleted" };
};
