import {
    app,
    HttpRequest,
    HttpResponseInit,
    InvocationContext
} from "@azure/functions";

export async function TimeNowHttp(
    request: HttpRequest,
    context: InvocationContext
): Promise<HttpResponseInit> {

    const currentTime = new Date().toISOString();

    return {
        status: 200,
        body: `Current server time: ${currentTime}`
    };
}

app.http("TimeNowHttp", {
    methods: ["GET"],
    authLevel: "anonymous",
    handler: TimeNowHttp
});