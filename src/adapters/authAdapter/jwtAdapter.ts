import * as jwt from "jsonwebtoken";



export class authJwt {

    public static token(id: string) {

        let secretKey = process.env.MY_SECRET
   

        if (secretKey != undefined) {

            const jwtToken = jwt.sign(
               
                   { id: id},
                    secretKey,
                    
            )
            return jwtToken
        }
    }

    public static checkToken(reqHeader: string | undefined) {

        const authHeader = reqHeader

        const token = authHeader && authHeader.split(" ")[1]

        if (!token) {
            return token
        }

        try {
            let secretKey = process.env.MY_SECRET

            if (secretKey != undefined) {
              
               const verificationToken = jwt.verify(token, secretKey)
               console.log("tokenver", verificationToken)
               return verificationToken
            }


        } catch (error) {
            console.log(error)
            return { message: "Invalid token" }
        }
    }
}
