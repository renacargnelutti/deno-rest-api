
export default async (ctx: any, next: any) => {
    try {
        await next();

        const rt = ctx.response.headers.get("X-Response-Time");
        console.log(`${ctx.request.method} ${ctx.request.url.pathname} ${ctx.response.status} - ${rt}`);
    } catch (err) {
        ctx.response.status = 500;
        ctx.response.body = { message: err.message };
    }
};