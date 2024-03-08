import request from "supertest"
import HTTPAdapter from "../../../../src/adapters/HTTPAdapter/protocol"
import { IBook } from "../../../../src/entities/Book";
import { IUser } from "../../../../src/entities/User";


describe('## GET ALL STOCK ##', () => {

    let app: any;
    let bookId: string;
    let tokenAdmin: string;

    const addingBook: IBook = {
        title: "Route update stock",
        synopsis: "I just got lost",
        price: 80,
        author: "Coldplay",
        pageCount: 23,
        publishedDate: '2012-10-09',
        genre: "Music"
    }

    beforeAll(async () => {

        HTTPAdapter.config()
        app = HTTPAdapter.getApp()

        const resultLogin = await request.agent(app)
            .post("/v1/users/login")
            .send({
                email: "admin_teste@gmail.com",
                password: "123"
            })
            .expect(200)
        const tokenJSON = resultLogin.body;
        expect(tokenJSON).toHaveProperty('token');
        tokenAdmin = tokenJSON.token;
    
    const resultBook = await request.agent(app)
        .post(`/v1/book/add`)
        .set('Authorization', `${tokenAdmin}`)
        .send(addingBook)
        .expect(200)
         bookId = resultBook.body.id   
    })

    afterAll(async () => {
        HTTPAdapter.close()

    })

    it("Deve atualizar estoque", async () => {
        const result = await request.agent(app)
            .get(`/v1/stock/update/book/${bookId}`)
            .set('Authorization', `${tokenAdmin}`)
            .send({quantity: 20})
            .expect(200)
             expect(result.body[0]).toHaveProperty("quantity");
    })

    it("Deve tentar atualizar o stock sem token", async () => {
        const result = await request.agent(app)
            .get(`/v1/stock/update/book/${bookId}/`)
            .send({quantity: 30})
            .expect(401)

    })


})