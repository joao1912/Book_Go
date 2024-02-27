import request from "supertest"
import HTTPAdapter from "../../../../src/adapters/HTTPAdapter/protocol"
import { IUser } from "@entities/User"
import { authAdapter } from "../../../../src/adapters/authAdapter/protocol"

describe('## GET ##' ,() => {
    
    let app: any
    let token: string
    beforeAll(() => {

        token =  authAdapter.sign('id_teste1', 18000)

        HTTPAdapter.config()
        app = HTTPAdapter.getApp()

    })


    it('Deve criar e buscar os usuários cadastrados', async () => {

        const user: IUser = {
            username: "a gis",
            password: "umaSenhaLoucaDeVerdade",
            email: "giDasSenhaLouca@gmail.com",
            telephone: "48998003827"
        }


        await request(app)
            .post('/v1/users/signIn')
            .send(user)
            .expect(200)
            .then(response => {
                console.log(response.body)

            })

    })

    it("Buscar todos os usuarios", async()=>{
        
        await request.agent(app)
        .get("/v1/users/")
        // .set('Accept', 'application/json')
        // .auth(token, {type: "bearer"})
            .set('Authorization', `${token}`)
            .expect(200)
            .then(response => {

                console.log(response.body)

            })
     
    })

}) 