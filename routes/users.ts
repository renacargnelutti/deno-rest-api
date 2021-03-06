
import { Router } from "https://deno.land/x/oak/mod.ts";

import {
    getUsers,
    getUserDetails,
    createUser,
    updateUser,
    deleteUser,
} from "../handlers/users.ts";

const router = new Router();

router
    .get("/api/users", getUsers)
    .post("/api/users", createUser)
    .get("/api/users/:id", getUserDetails)
    .put("/api/users/:id", updateUser)
    .delete("/api/users/:id", deleteUser);

export default router;
