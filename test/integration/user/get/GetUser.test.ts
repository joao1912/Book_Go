import request from "supertest"
import HTTPAdapter from "../../../../src/adapters/HTTPAdapter/protocol"
import { IUser } from "@entities/User"
import { authAdapter } from "../../../../src/adapters/authAdapter/protocol"

describe('## GET ##' ,() => {
    
    let app: any
    beforeAll(async()=>{
        
        HTTPAdapter.config()
        app = HTTPAdapter.getApp()

        const userToLogin: IUser = {
            username: "Login Teste",
            password: "123",
            email: "testelogin@gmail.com",
            telephone: "4899988800"
        }


        await request(app)
            .post('/v1/users/signIn')
            .send(userToLogin)
            .expect(200)
            // .then(response => {

            //     console.log(response.body)

            // })
    })
  
    afterAll(async()=>{
        HTTPAdapter.close()

    })



   

    it("Deve fazer login e receber um token", async()=>{
        
    
        await request.agent(app)
        .post("/v1/users/login")
        .send({
            email: "testelogin@gmail.com",
            password: "123"
        })
            .expect(200)
            .then(response => {
                expect(response.text).toContain("token")
                // console.log(response.text)

            })
     
    })
    it("Tentativa fazer login sem senha deve receber uma mensagem", async()=>{
        
        await request.agent(app)
        .post("/v1/users/login")
        .send({
            email: "testelogin@gmail.com",
          
        })
            .expect(422)
            .then(response => {

                expect(response.text).toContain("Enter you password")
                // HTTPAdapter.close()

            })
     
    })
    it("Tentativa de fazer login sem email deve receber uma mensagem", async()=>{
        
        await request.agent(app)
        .post("/v1/users/login")
        .send({
            password: "123"
        })
            .expect(422)
            .then(response => {

                expect(response.text).toBeTruthy
                // HTTPAdapter.close()

            })
     
    })
    it("Tentativa de fazer login com senha incorreta deve receber uma mensagem", async()=>{
        
        await request.agent(app)
        .post("/v1/users/login")
        .send({
            email: "testelogin@gmail.com",
            password: "abc"
          
        })
            .expect(403)
            .then(response => {

                expect(response.text).toContain("Invalid password")

            })
     
    })
    it("Tentativa de fazer login sem email e senha: deve receber uma mensagem", async()=>{
        
        await request.agent(app)
        .post("/v1/users/login")
        // .send({
          
        // })
            .expect(422)
            .then(response => {

                expect(response.text).toBeTruthy
              
            })
     
    })

    // FAZER TENTATIVA COM EMAIL INCORRETO

}) 