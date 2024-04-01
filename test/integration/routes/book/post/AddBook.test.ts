import request from "supertest"
import HTTPAdapter from "../../../../src/adapters/HTTPAdapter/protocol"
import { IBook } from "../../../../src/entities/Book";

describe('## POST ##', () => {

    let app: any;
    let token: string;

    const addingBook: IBook = {
        title: "A Route too add book",
        synopsis: "I just got lost in the mountain while I was travelling to...",
        price: 80,
        author: "Coldplay",
        pageCount: 23,
        publishedDate: '2012-10-09',
        genre: "Music"
    }

    beforeAll(async () => {

        HTTPAdapter.config()
        app = HTTPAdapter.getApp()

        await request(app)
            .post("/v1/users/login")
            .send({
                email: "admin_teste@gmail.com",
                password: "123.aB",
            })
            .expect(200)
            .then(response => {

                const tokenJSON = response.body;
                expect(tokenJSON).toHaveProperty('token');
                token = tokenJSON.token;

            })

    })

    it("Deve adicionar um livro", async () => {

        await request(app)
            .post(`/v1/book/add`)
            .set('Authorization', `${token}`)
            .send(addingBook)
            .expect(200)
            .then(response => {

                const book = response.body
                expect(book).toHaveProperty("id")

            })

    })

    it("Deve tentar adicionar um livro sem titulo", async () => {

        await request(app)
            .post(`/v1/book/add`)
            .set('Authorization', `${token}`)
            .send({
                synopsis: "I just got lost in the mountain while I was travelling to...",
                price: 80,
                author: "Coldplay",
                pageCount: 23,
                publishedDate: '2012-10-09',
                genre: "Music"
            })
            .expect(400)
            .then(response => {

                const error = JSON.parse(response.body.message)

                expect(error).toEqual([
                    {
                        code: "invalid_type",
                        expected: "string",
                        received: "undefined",
                        path: ["title"],
                        message: "Required"
                    }
                ])

            })

    })

    it("Deve tentar adicionar um livro sem titulo", async () => {

        await request(app)
            .post(`/v1/book/add`)
            .set('Authorization', `${token}`)
            .send({
                synopsis: "I just got lost in the mountain while I was travelling to...",
                price: 80,
                author: "Coldplay",
                pageCount: 23,
                publishedDate: '2012-10-09',
                genre: "Music"
            })
            .expect(400)
            .then(response => {

                const error = JSON.parse(response.body.message)

                expect(error).toEqual([
                    {
                        code: "invalid_type",
                        expected: "string",
                        received: "undefined",
                        path: ["title"],
                        message: "Required"
                    }
                ])

            })

    })

    it("Deve tentar adicionar um livro com sinopse bem pequena fora do limite", async () => {

        await request(app)
            .post(`/v1/book/add`)
            .set('Authorization', `${token}`)
            .send({
                title: "Hello Moon",
                synopsis: "I just ",
                price: 80,
                author: "Coldplay",
                pageCount: 23,
                publishedDate: '2012-10-09',
                genre: "Music"
            })
            .expect(400)
            .then(response => {

                const error = JSON.parse(response.body.message)

                expect(error).toEqual([
                    {
                        code: "too_small",
                        minimum: 20,
                        type: "string",
                        inclusive: true,
                        exact: false,
                        message: "The synopsis must be at least 20 characters long.",
                        path: ["synopsis"]
                    }
                ])

            })
    })

    afterAll(async () => {
        
        HTTPAdapter.close()

    })

})