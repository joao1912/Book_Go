
import request from "supertest"
import HTTPAdapter from "../../../../src/adapters/HTTPAdapter/protocol"
import { IUser } from "../../../../src/entities/User"

describe('## PUT ##', () => {

    let app: any
    let token: string
    let id: string

    const userToLogin: IUser = {
        username: "updateUser",
        email: "updateuser@gmail.com",
        password: "Teste_123",
        telephone: "4299988800"
    }

    const newValues: IUser = {
        password: "Teste_456",
        email: "newupdateuser@gmail.com",
        telephone: "998337846",
        username: "newUserNameToUser"
    }

    beforeAll(async () => {

        HTTPAdapter.config()
        app = HTTPAdapter.getApp()

        const result = await request(app)
            .post('/v1/users/signIn')
            .send(userToLogin)
            .expect(200)
        const user = result.body.user;
        expect(user).toHaveProperty('id');
        id = user.id;


        const resultLogin = await request(app)
            .post("/v1/users/login")
            .send({
                email: "updateuser@gmail.com",
                password: "Teste_123",
            })
            .expect(200)
        const tokenOBJ = resultLogin.body;
        expect(tokenOBJ).toHaveProperty('token');
        token = tokenOBJ.token;
    })

    it("Deve mudar a senha", async () => {

        

        await request(app)
            .put(`/v1/users/update`)
            .set('Authorization', `${token}`)
            .send(newValues.password)
            .expect(200)
            .then(response => {

                expect(response.body).toEqual({
                    email: userToLogin.email,
                    id: id,
                    telephone: userToLogin.telephone,
                    username: userToLogin.username,
                })

            })

    })

    it("Deve mudar o telefone", async()=>{
        await request(app)
        .put(`/v1/users/update`)
        .set('Authorization', `${token}`)
        .send(newValues.telephone)
        .expect(200)
        .then(response => {

            const data = response.body;

            expect(response.body).toEqual({
                telephone: newValues.telephone,
                ...data
            })

        })
        
    })
    it("Deve mudar o username", async()=>{
        await request(app)
        .put(`/v1/users/update`)
        .set('Authorization', `${token}`)
        .send(newValues.username)
        .expect(200)
        .then(response => {

            const data = response.body;

            expect(response.body).toEqual({
                username: newValues.username,
                ...data
            })

        })
       
    })

    it("Deve dar erro ao tentar mudar o email", async () => {
        await request(app)
        .put(`/v1/users/update`)
        .set('Authorization', `${token}`)
        .send(newValues.email)
        .expect(200)
        .then(response => {

            const data = response.body;

            expect(response.body).toEqual({
                email: newValues.email,
                ...data
            })

        })

    })

    afterAll(async () => {

        HTTPAdapter.close()

    })

})
