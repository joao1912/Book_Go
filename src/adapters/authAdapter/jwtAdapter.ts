import * as jwt from "jsonwebtoken";
import { IAuthAdapterRepository } from "./repository/IAuthAdapterRepository";
import { JwtPayload } from "jsonwebtoken";

interface TokenPayload extends JwtPayload {
    
    id: string;
}

class AuthJwt implements IAuthAdapterRepository {

    public sign(id: string) {

        let secretKey = process.env.MY_SECRET


        if (secretKey != undefined) {

            const jwtToken = jwt.sign(

                { id: id },
                secretKey,

            )
            return jwtToken
        }
    }

    public checkToken(token: string): string | null {
        try {
            const secretKey = process.env.MY_SECRET;
    
            if (secretKey !== undefined) {
                const decoded = jwt.verify(token, secretKey) as TokenPayload;
                return decoded.id;
            } else {
                throw new Error('Chave secreta não definida');
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}

export default new AuthJwt()
