import HTTPAdapter from "@adapters/HTTPAdapter/protocol"
import { IUser } from "@entities/User"
import { response } from "express"
import request from "supertest"



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
            password: "123",
            telephone: "4299988800"
        }


      const result =  await request(app)
            .post('/v1/users/signIn')
            .send(userToLogin)
            .expect(200)
            const user = result.body;
            expect(user).toHaveProperty('id');
            id = user.id;

    
       const resultLogin = await request.agent(app)
            .post("/v1/users/login")
            .send({
                email: "updateuser@gmail.com",
                password: "123",
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
        await request.agent(app)
        .put(`/v1/users/update/${id}`)
        .set('Authorization', `${token}`)
        .send({
            password: "YEAH"
        })
        .then(response => {
            console.log(response.text)
        })
    })
    it("Deve mudar o email", async()=>{
        await request.agent(app)
        .put(`/v1/users/update/${id}`)
        .set('Authorization', `${token}`)
        .send({
            email: "newupdateuser@gmail.com"
        })
        .then(response => {
            console.log(response.text)
        })
    })
    it("Deve mudar o telefone", async()=>{
        await request.agent(app)
        .put(`/v1/users/update/${id}`)
        .set('Authorization', `${token}`)
        .send({
            telefone: "50-000443320"
        })
        .then(response => {
            console.log(response.text)
        })
    })
    it("Deve mudar o username", async()=>{
        await request.agent(app)
        .put(`/v1/users/update/${id}`)
        .set('Authorization', `${token}`)
        .send({
            username: "new-update-user@gmail.com"
        })
        .then(response => {
            console.log(response.text)
        })
    })

})
