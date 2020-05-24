
import { Client } from "https://deno.land/x/postgres@v0.3.11/mod.ts";

class Database {
    constructor() {
        this.connect();
    }

    async connect() {
        this.client = new Client({
            user: "admin_user",
            database: "test_database",
            host: "localhost",
            password: "admin_password",
            port: "5432"
        });

        await this.client.connect();
    }
}

export default new Database().client;