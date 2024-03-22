import request from "supertest"
import HTTPAdapter from "../../../../src/adapters/HTTPAdapter/protocol"
import { IBook } from "../../../../src/entities/Book";

describe('## GET ##', () => {

    let app: any;
    let tokenAdmin: string;

    const addingBook: IBook = {
        title: "O Despertar das Estrelas",
        synopsis: "Explore a vastidão do universo através desses poemas cósmicos, que buscam capturar a beleza efêmera das estrelas e a imensidão do espaço sideral.",
        price: 15,
        author: "Galileu Galilei",
        pageCount: 78,
        publishedDate: "1609-03-05",
        genre: "Poesia"
    }

    beforeAll(async () => {

        HTTPAdapter.config()
        app = HTTPAdapter.getApp()

        await request(app)
            .post("/v1/users/login")
            .send({
                email: "admin_teste@gmail.com",
                password: "123.aB"
            })
            .expect(200)
            .then(response => {

                const tokenJSON = response.body;
                expect(tokenJSON).toHaveProperty('token');
                tokenAdmin = tokenJSON.token;

            })
        
    
    await request(app)
        .post(`/v1/book/add`)
        .set('Authorization', `${tokenAdmin}`)
        .send(addingBook)
        .expect(200)

    })

    it("Deve listar todos os livros com o estoque", async () => {

        await request(app)
            .get(`/v1/stock/all`)
            .set('Authorization', `${tokenAdmin}`)
            .expect(200)
            .then(response => {
                
                expect(response.body.length).toBeGreaterThan(0)
                expect(response.body[0]).toHaveProperty("quantity");

            })
             
    })

    it("Deve tentar ver todas o stock sem token", async () => {

        await request(app)
            .get(`/v1/stock/all`)
            .expect(401)
            .then(response => {

                expect(response.body).toEqual({ message: 'Must have an authorization token' })

            })

    })

    afterAll(async () => {
        
        HTTPAdapter.close()

    })

})