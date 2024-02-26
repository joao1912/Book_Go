import HTTPAdapter from "@adapters/HTTPAdapter/protocol"
import { IUser } from "@entities/User"
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


        await request(app)
            .post('/v1/users/signIn')
            .send(userToLogin)
            .expect(200)
            .then(response => {
                console.log(response.text)
            })
    
        const result = await request.agent(app)
            .post("/v1/users/login")
            .send({
                email: "updateuser@gmail.com",
                password: "123",
            })
            .expect(200)
            .then(response => {
              
                token = response.text
                // console.log(response.text)

            })
    })

    afterAll(async () => {
        HTTPAdapter.close()

    })

// Falta o Id, 
    it("Deve mudar a senha", async()=>{
        await request.agent(app)
        .put(`v1/users/update/${id}`)
        .set('Authorization', `${token}`)
        .send({
            password: "123"
        })
    })

})
