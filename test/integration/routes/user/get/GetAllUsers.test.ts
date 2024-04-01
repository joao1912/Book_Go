import request from "supertest"
import HTTPAdapter from "../../../../src/adapters/HTTPAdapter/protocol"
import { authAdapter } from "../../../../src/adapters/authAdapter/protocol"
import { IUser } from "../../../../src/entities/User"

describe('## GET ##' ,() => {
    
    let app: any
    let token: string

    beforeAll(async () => {

        token =  authAdapter.sign('id_teste1', 18000)

        HTTPAdapter.config()
        app = HTTPAdapter.getApp()

        const user: IUser = {
            username: "Um User",
            password: "Teste_123",
            email: "giDasSenhaLouca123@gmail.com",
            telephone: "48996003856"
        }

        await request(app)
            .post('/v1/users/signIn')
            .send(user)

    })

    it("Buscar todos os usuarios", async() => {
        
        await request(app)
        .get("/v1/users/")
        .set('Authorization', `${token}`)
        .expect(200)
        .then(response => {

            const data: IUser[] = response.body
                
            expect(data.length).toBeGreaterThanOrEqual(1)

        })
     
    })

})