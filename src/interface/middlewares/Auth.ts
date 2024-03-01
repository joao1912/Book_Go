import { HttpNext, HttpRequest, HttpResponse } from "../../adapters/HTTPAdapter/protocol";
import { authAdapter } from "../../adapters/authAdapter/protocol";

export default class Auth {

    public static async execute(req: HttpRequest, res: HttpResponse, next: HttpNext) {
        // console.log(req.headers.authorization)
        const token = req.headers.authorization

        if (typeof token != 'string') {
         
            throw new Error('Must have an authorization token')
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