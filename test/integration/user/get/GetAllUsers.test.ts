import request from "supertest"
import HTTPAdapter from "@adapters/HTTPAdapter/protocol"
import { Application } from "express"
import { IUser } from "@entities/User"

describe('## GET ##' ,() => {

    let app: Application

    beforeAll(() => {

        HTTPAdapter.config()
        app = HTTPAdapter.getApp()

    })

    it('Deve criar e buscar um usuário', async () => {

        const user: IUser = {
            username: "a gi",
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

        await request(app)
            .get('/v1/users/')
            .expect(200)
            .then(response => {

                console.log(response.body)

            })
    })

}) 