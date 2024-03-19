import { HttpNext, HttpRequest, HttpResponse } from "../../adapters/HTTPAdapter/protocol";
import { authAdapter } from "../../adapters/authAdapter/protocol";
import ServerResponse from "../controllers/utils/ServerResponse";

export default class Auth {

    public static async execute(req: HttpRequest, res: HttpResponse, next: HttpNext) {

        const token = req.headers.authorization

        if (typeof token != 'string') {
            ServerResponse
                .notAuthorized('JsonWebTokenError', 'Must have an authorization token')
        }

        try {
            
            const id = authAdapter.checkToken(token)

            if (typeof id != 'string') ServerResponse.badRequest('JsonWebTokenError', 'Id must be a string')
            
            req.userId = id
          
            next()

        } catch (error) {
            
            console.log(error)
            ServerResponse.notAuthorized('JsonWebTokenError', 'Invalid or expired token.')
            
        }

    }

}