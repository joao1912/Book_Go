export class CustomError extends Error {

    statusCode: number;

    constructor(name: string, message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.name = name;
        Error.captureStackTrace(this, this.constructor);
    }
    

}
