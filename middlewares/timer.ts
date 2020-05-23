
export default async (ctx: any, next: any) => {
    try {
        const start = Date.now();
        await next();

        const ms = Date.now() - start;
        ctx.response.headers.set("X-Response-Time", `${ms}ms`);
    } catch (err) {
        ctx.response.status = 500;
        ctx.response.body = { message: err.message };
    }
};
