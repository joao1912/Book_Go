export class CustomError extends Error {

    statusCode: number;

    constructor(name: string, message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.name = name;
        Error.captureStackTrace(this, this.constructor);
    }
    static ok(name: string, message: string): CustomError {
        return new CustomError(name, message, 200);
    }
    static badRequest(name: string, message: string): CustomError {
        return new CustomError(name, message, 400);
    }
    static notAuthorized(name: string, message: string): CustomError {
        return new CustomError(name, message, 401);
    }

    static notFound(name: string,message: string): CustomError {
        return new CustomError(name, message, 404);
    }

    static conflict(name: string, message: string): CustomError {
        return new CustomError(name, message, 409);
    }

    static missingParameters(name: string, message: string): CustomError {
        return new CustomError(name, message, 422);
    }

    static serviceUnavailable(name: string,message: string): CustomError {
        return new CustomError(name, message, 503);
    }

}
