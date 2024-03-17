import { HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import { CustomError } from "./CustomError";


class ServerResponse {
    public response: HttpResponse;

    constructor(res: HttpResponse) {
        this.response = res;
    }

    ok(message: any): void {
        this.response.status(200).json(message);
    }

    static badRequest(name: string, message: string): CustomError {
        throw new CustomError(name, message, 400);
    }
    static notAuthorized(name: string, message: string): CustomError {
        throw new CustomError(name, message, 401);
    }

    static notFound(name: string, message: string): CustomError {
        throw new CustomError(name, message, 404);
    }

    static conflict(name: string, message: string): CustomError {
        throw new CustomError(name, message, 409);
    }

    missingParameters(name: string, message: string): CustomError {
        throw new CustomError(name, message, 422);
    }

    static serviceUnavailable(name: string, message: string): CustomError {
        throw new CustomError(name, message, 503);
    }

}

export default ServerResponse;
