
import { response } from "express"
import request from "supertest"
import HTTPAdapter from "../../../../src/adapters/HTTPAdapter/protocol"
import { IUser } from "../../../../src/entities/User"



describe('## PUT ##', () => {

    let app: any
    let token: string
    let id: string

 
    beforeAll(async () => {

        HTTPAdapter.config()
        app = HTTPAdapter.getApp()

        const userToLogin: IUser = {
            username: "updateUser",
            email: "updateuser@gmail.com",
            password: "Teste_123",
            telephone: "4299988800"
        }


      const result =  await request(app)
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

    afterAll(async () => {
        HTTPAdapter.close()

    })


    it("Deve mudar a senha", async()=>{

        const newValues: IUser = {
            password: "Teste_456",
            email: "newupdateuser@gmail.com",
            telephone: "998337846",
            username: "newUserNameToUser"
        }

        await request(app)
        .put(`/v1/users/update/${id}`)
        .set('Authorization', `${token}`)
        .send(newValues)
        .expect(200)
        .then(response => {

            const id = response.body.id

            expect(response.body).toEqual({
                id: id,
                ...newValues
            })

        })

    })
    /* it("Deve mudar o email", async()=>{
        await request(app)
        .put(`/v1/users/update/${id}`)
        .set('Authorization', `${token}`)
        .send({
            email: "newupdateuser@gmail.com"
        })
        .expect(200)

    })
    it("Deve mudar o telefone", async()=>{
        await request(app)
        .put(`/v1/users/update/${id}`)
        .set('Authorization', `${token}`)
        .send({
            telefone: "50-000443320"
        })
        .expect(200)

        // .then(response => {
        //     console.log(response.text)
        // })
    })
    it("Deve mudar o username", async()=>{
        await request(app)
        .put(`/v1/users/update/${id}`)
        .set('Authorization', `${token}`)
        .send({
            username: "new-update-user@gmail.com"
        })
        .expect(200)
        // .then(response => {
        //     console.log(response.text)
        // })
    }) */

})
