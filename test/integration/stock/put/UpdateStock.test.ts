import request from "supertest"
import HTTPAdapter from "../../../../src/adapters/HTTPAdapter/protocol"
import { IBook } from "../../../../src/entities/Book";

describe('## PUT ##', () => {

    let app: any;
    let bookId: string;
    let tokenAdmin: string;

    const addingBook: IBook = {
        title: "Caminhos do Infinito",
        synopsis: "Explore os mistérios do universo e da vida através dos versos deste livro. Com uma linguagem poética única, o autor convida os leitores a embarcarem numa jornada de autodescoberta e conexão com o cosmos.",
        price: 22,
        author: "Carl Sagan",
        pageCount: 90,
        publishedDate: "1980-09-28",
        genre: "Poesia Científica"
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
            .then(response => {

                bookId = response.body.id

            })
        
    })

    it("Deve atualizar estoque", async () => {
        
        await request(app)
            .put(`/v1/stock/update/book/${bookId}`)
            .set('Authorization', `${tokenAdmin}`)
            .send({ quantity: 20 })
            .expect(200)
            .then(response => {
                
                expect(response.body).toHaveProperty("quantity");
                expect(response.body.quantity).toBe(20)

            })
        
    })

    it("Deve tentar atualizar o stock sem token", async () => {

        await request(app)
            .put(`/v1/stock/update/book/${bookId}/`)
            .send({ quantity: 30 })
            .expect(401)
            .then(response => {

                expect(response.body).toEqual({ message:"Must have an authorization token" })

            })

    })

    afterAll(async () => {

        HTTPAdapter.close()

    })

})