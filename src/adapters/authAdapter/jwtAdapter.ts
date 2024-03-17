import { IAuthAdapterRepository } from "./repository/IAuthAdapterRepository";
import { JwtPayload } from "jsonwebtoken";
import * as jwt from 'jsonwebtoken';

interface TokenPayload extends JwtPayload {
    
    id: string;
}

class AuthJwt implements IAuthAdapterRepository {

    public sign(id: string, expiration?: number) {

        let secretKey = process.env.MY_SECRET


        if (secretKey != undefined) {

            try {
                const jwtToken = jwt.sign(

                    { id: id },
                    secretKey,
                    {expiresIn: expiration ? expiration : 1209600000}
    
                )
                return jwtToken
            } catch (error) {
                throw new Error('Internal server error: ' + error)
            }
            
        } else {

            throw new Error('Internal server error: failed to attempt to find secret_key')

        }
    }

    public checkToken(token: string): string | null {

       
        const secretKey = process.env.MY_SECRET;

        if (secretKey == undefined) throw new Error('Chave secreta não definida');

        const decoded = jwt.verify(token, secretKey) as TokenPayload;
        
        return decoded.id;

    }

    public getAuth() {
        return jwt
    }
}

export default new AuthJwt()
