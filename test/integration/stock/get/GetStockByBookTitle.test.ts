import request from "supertest"
import HTTPAdapter from "../../../../src/adapters/HTTPAdapter/protocol"
import { IBook } from "../../../../src/entities/Book";


describe('## GET ##', () => {

    let app: any;
    let tokenAdmin: string;

    const addingBook: IBook = {
        title: "Flores do Silêncio",
        synopsis: "Entre no mundo mágico das flores e descubra os segredos escondidos por trás de suas pétalas. Este livro oferece uma jornada poética que convida você a explorar a beleza e o mistério das flores e a encontrar paz no silêncio de seus jardins.",
        price: 18,
        author: "Rumi",
        pageCount: 64,
        publishedDate: "1273-12-30",
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

    it("Deve mostrar o estoque de um livro", async () => {

        await request(app)
            .get(`/v1/stock/book/title?title=Route%20stock%20title`)
            .set('Authorization', `${tokenAdmin}`)
            .expect(200)
            .then(response => {

                expect(response.body[0]).toHaveProperty("quantity");

            })
        
    })

    it("Deve tentar ver stock sem token", async () => {

        await request(app)
            .get(`/v1/stock/book/title?title=${addingBook.title}`)
            .expect(401)
            .then(response => {

                expect(response.body).toEqual({ message:"Must have an authorization token" })

            })

    })

    it("Deve tentar ver stock de um livro inexistente", async () => {

        await request(app)
            .get(`/v1/stock/book/title?title=esse livro nao existe`)
            .set('Authorization', `${tokenAdmin}`)
            .expect(404)
            .then(response => {

                expect(response.body).toEqual('No results.')

            })

    })

    afterAll(async () => {
        
        HTTPAdapter.close()

    })

})