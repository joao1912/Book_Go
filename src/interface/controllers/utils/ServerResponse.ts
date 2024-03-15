import { HttpResponse } from "../../../adapters/HTTPAdapter/protocol";

class ServerResponse extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }

    static ok(message: string): ServerResponse {
        return new ServerResponse(message, 200);
    }
    static badRequest(message: string): ServerResponse {
        return new ServerResponse(message, 400);
    }
    static notAuthorized(message: string): ServerResponse {
        return new ServerResponse(message, 401);
    }

    static notFound(message: string): ServerResponse {
        return new ServerResponse(message, 404);
    }

    static conflict(message: string): ServerResponse {
        return new ServerResponse(message, 409);
    }

    static missingParameters(message: string): ServerResponse {
        return new ServerResponse(message, 422);
    }

    static serviceUnavailable(message: string): ServerResponse {
        return new ServerResponse(message, 503);
    }
}

export default ServerResponse;
