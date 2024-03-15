import { HttpNext, HttpRequest, HttpResponse } from "../../adapters/HTTPAdapter/protocol";
import { CustomError } from "../controllers/utils/CustomError";



export default class ErrorHandler {

    public static execute(err: CustomError, req: HttpRequest, res: HttpResponse, next: HttpNext) {

        const statusCode = err.statusCode;
        console.log('funciona caralho: ' + err)
        return res.status(statusCode).json(err);

    }

}