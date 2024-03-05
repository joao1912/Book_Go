import request from "supertest"
import HTTPAdapter from "../../../../src/adapters/HTTPAdapter/protocol"
import { IBook } from "../../../../src/entities/Book";
import { IUser } from "../../../../src/entities/User";


describe('## GET ALL STOCK ##', () => {

    let app: any;
    let id: string;
    let tokenAdmin: string;

    const addingBook: IBook = {
        title: "Route stock title",
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

    })

    afterAll(async () => {
        HTTPAdapter.close()

    })

    it("Deve listar todos os livros com o estoque", async () => {
        const result = await request.agent(app)
            .get(`/v1/stock/all`)
            .set('Authorization', `${tokenAdmin}`)
            .expect(200)
             expect(result.body[0]).toHaveProperty("quantity");
    })

    it("Deve tentar ver stock sem token", async () => {
        const result = await request.agent(app)
            .get(`/v1/stock/all`)
            .expect(401)

    })


})