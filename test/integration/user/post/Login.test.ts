import request from "supertest"
import HTTPAdapter from "../../../../src/adapters/HTTPAdapter/protocol"
import { IUser } from "../../../../src/entities/User"

describe('## POST ##', () => {

    let app: any
    beforeAll(async () => {

        HTTPAdapter.config()
        app = HTTPAdapter.getApp()

        const userToLogin: IUser = {
            username: "Login Teste",
            password: "123.aB*",
            email: "testelogin@gmail.com",
            telephone: "4899988800"
        }


        await request(app)
            .post('/v1/users/signIn')
            .send(userToLogin)
            .expect(200)

    })

    it("Deve fazer login e receber um token", async () => {


        await request(app)
            .post("/v1/users/login")
            .send({
                email: "testelogin@gmail.com",
                password: "123.aB*"
            })
            .expect(200)
            .then(response => {

                expect(response.text).toContain("token")
                
            })

    })

    it("Tentativa fazer login sem senha deve receber uma mensagem", async () => {

        await request(app)
            .post("/v1/users/login")
            .send({
                email: "testelogin@gmail.com",

            })
            .expect(400)
            .then(response => {
          

                expect(response.body).toEqual({ message: 'Invalid password.'})
             

            })

    })

    it("Tentativa de fazer login sem email deve receber uma mensagem", async () => {

        await request(app)
            .post("/v1/users/login")
            .send({
                password: "123.aB."
            })
            .expect(400)
            .then(response => {

                expect(response.body).toEqual({message: 'Email must be valid.'})

            })

    })

    it("Tentativa de fazer login com senha incorreta deve receber uma mensagem", async () => {

        await request(app)
            .post("/v1/users/login")
            .send({
                email: "testelogin@gmail.com",
                password: "abc"

            })
            .expect(401)
            .then(response => {

                expect(response.body).toEqual({ message: 'Email or password is incorrect.' })

            })

    })

    it("Tentativa de fazer login sem email e senha: deve receber uma mensagem", async () => {

        await request(app)
            .post("/v1/users/login")
            .expect(400)
            .then(response => {

                expect(response.text).toBeTruthy

            })

    })

    it("Tentativa de fazer login com email incorreto: deve receber uma mensagem", async () => {

        await request(app)
            .post("/v1/users/login")
            .send({
                email: "testelog@gmail.com",
                password: "Teste_123"
            })
            .expect(401)
            .then(response => {

                expect(response.body).toEqual({ message: 'Email or password is incorrect.' })

            })

    })

    afterAll(async () => {
        
        HTTPAdapter.close()

    })

}) 