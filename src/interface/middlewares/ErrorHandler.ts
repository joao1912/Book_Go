import { HttpNext, HttpRequest, HttpResponse } from "../../adapters/HTTPAdapter/protocol";
import { CustomError } from "../controllers/utils/CustomError";



export default class ErrorHandler {

    public static execute(err: Error & Partial<CustomError>, req: HttpRequest, res: HttpResponse, next: HttpNext) {

        const statusCode = err.statusCode || 500;
        console.log('funciona caralho: ' + err)
        return res.status(statusCode).json(err);

    }

}