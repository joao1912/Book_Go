import request from "supertest"
import HTTPAdapter from "../../../../src/adapters/HTTPAdapter/protocol"
import { IUser } from "../../../../src/entities/User"

describe('## GET ##' ,() => {
    
    let app: any

    beforeAll(() => {

        HTTPAdapter.config()
        app = HTTPAdapter.getApp()

    })

    it('Deve criar e buscar o usuário cadastrado', async () => {

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

    })

})