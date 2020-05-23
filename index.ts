
import { Application } from "https://deno.land/x/oak/mod.ts";
import { APP_HOST, APP_PORT } from "./config.ts";

import users from "./routes/users.ts";
import notFound from "./handlers/notFound.ts";

import errorMiddleware from "./middlewares/error.ts";
import loggerMiddleware from "./middlewares/logger.ts";
import timerMiddleware from "./middlewares/timer.ts";

const app = new Application();

app.use(loggerMiddleware);
app.use(timerMiddleware);
app.use(errorMiddleware);

app.use(users.routes());

app.use(notFound);

console.log(`Listening on ${APP_PORT}...`);
await app.listen(`${APP_HOST}:${APP_PORT}`);
