import { HttpNext, HttpRequest, HttpResponse } from "../../adapters/HTTPAdapter/protocol";
import { CustomError } from "../controllers/utils/CustomError";
import ServerResponse from "../controllers/utils/ServerResponse";



export default class ErrorHandler {

    public static execute(err: Error & Partial<CustomError>, req: HttpRequest, res: HttpResponse, next: HttpNext) {

        const statusCode = err.statusCode || 500;
        const message = err.statusCode ? err.message : 'Internal Server Error'

        return res.status(statusCode).json({
            message
        });

    }

}