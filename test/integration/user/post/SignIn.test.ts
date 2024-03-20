import HTTPAdapter from "../../../../src/adapters/HTTPAdapter/protocol"
import request from "supertest"
import { IUser } from "../../../../src/entities/User"
import { json } from "stream/consumers"

describe("## POST ##", () => {

    let app: any

    beforeAll(async () => {

        HTTPAdapter.config()
        app = HTTPAdapter.getApp()

    })


    it('Deve criar um usuário', async () => {

        const userData = {
            username: "Joanir Teixeira",
            email: "joanirTeixeira@teste.com",
            telephone: "48998553785"
        }

        const teste = await request(app)
            .post('/v1/users/signIn')
            .send({...userData,  password: "Joanir_123",})
            .expect(200)
            .then( response => {

   

                const userId = response.body.user.id
                const token =  response.body.token

                const dataExpected = {
                    user: {...userData, id: userId, favoritesBooks: []},
                    token: token
                }
                
                expect(response.body).toEqual(dataExpected)
            }) 

    })
    fit('Deve tentar criar um usuário sem um caracter especial. Deve receber erro', async () => {

        const userData = {
            username: "Gus Teixeira",
            email: "gusTeixeira@teste.com",
            telephone: "48995553785"
        }

        const teste = await request(app)
            .post('/v1/users/signIn')
            .send({...userData,  password: "Gus123",})
            .expect(400)
            .then( response => {
                
                // expect(response.body.message).toContain(`Password must contain at least one of these special characters: \\"#@%*&-."`)
            }) 


    })

})