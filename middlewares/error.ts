
export default async ({ response }: { response: any }, next: any) => {
    try {
        await next();
    } catch (err) {
        response.status = 500;
        response.body = { message: err.message };
    }
};
