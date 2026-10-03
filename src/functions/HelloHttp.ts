import {
    app,
    HttpRequest,
    HttpResponseInit,
    InvocationContext
} from "@azure/functions";

interface NameRequest {
    firstName?: string;
    lastName?: string;
}

export async function HelloHttp(
    request: HttpRequest,
    context: InvocationContext
): Promise<HttpResponseInit> {

    try {
        const body = await request.json() as NameRequest;

        const firstName = body.firstName?.trim();
        const lastName = body.lastName?.trim();

        if (!firstName || !lastName) {
            return {
                status: 400,
                body: "Please provide both firstName and lastName."
            };
        }

        return {
            status: 200,
            body: `Hello, ${firstName} ${lastName}!`
        };

    } catch (error) {
        return {
            status: 400,
            body: "Invalid JSON. Please provide firstName and lastName as JSON."
        };
    }
}

app.http("HelloHttp", {
    methods: ["POST"],
    authLevel: "anonymous",
    handler: HelloHttp
});