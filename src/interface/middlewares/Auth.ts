import { HttpNext, HttpRequest, HttpResponse } from "../../adapters/HTTPAdapter/protocol";
import { authAdapter } from "../../adapters/authAdapter/protocol";

export default class Auth {

    public static async execute(req: HttpRequest, res: HttpResponse, next: HttpNext) {

        const token = req.headers['Authorization']

        if (typeof token != 'string') {
            throw new Error('Invalid token')
        }

        try {
            
            const id = authAdapter.checkToken(token)

            if (typeof id != 'string') throw new Error('id can not be type string')
            
            req.userId = id

            next()

        } catch (error) {
            
            res.status(401).json({message: 'Invalid Token'})
            
        }

    }

}