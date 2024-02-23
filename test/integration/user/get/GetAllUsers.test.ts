import request from "supertest"
import HTTPAdapter from "../../../../src/adapters/HTTPAdapter/protocol"
import { IUser } from "@entities/User"
import { authAdapter } from "../../../../src/adapters/authAdapter/protocol"

describe('## GET ##' ,() => {

    let app: any

    beforeAll(() => {

        HTTPAdapter.config()
        app = HTTPAdapter.getApp()

    })

    it('Deve criar e buscar os usuários cadastrados', async () => {

        const user: IUser = {
            username: "a gi",
            password: "umaSenhaLoucaDeVerdade",
            email: "giDasSenhaLouca@gmail.com",
            telephone: "48998003827"
        }

        const token = authAdapter.sign('id_teste', 180000)

        await request(app)
            .post('/v1/users/signIn')
            .send(user)
            .expect(200)
            .then(response => {

                console.log(response.body)

            })

        await request(app)
            .get('/v1/users/')
            .auth(token, {type : "bearer"})
            .expect(200)
            .then(response => {

                console.log(response.body)

            })
    })

}) 