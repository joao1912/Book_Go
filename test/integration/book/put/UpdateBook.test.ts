import request from "supertest"
import HTTPAdapter from "../../../../src/adapters/HTTPAdapter/protocol"
import { IBook } from "../../../../src/entities/Book";

describe('## PUT ##', () => {

    let app: any;
    let bookId: string;
    let token: string;

    const Book1: IBook = {
        title: "O Livro do Update",
        synopsis: "Usado nas construções",
        price: 80,
        author: "Pedro Cascau",
        pageCount: 23,
        publishedDate: '2014-10-09',
        genre: "Art"
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
                token = tokenJSON.token;

            })

        await request(app)
            .post(`/v1/book/add`)
            .set('Authorization', `${token}`)
            .send(Book1)
            .expect(200)
            .then(response => {

                const book = response.body;
                expect(book).toHaveProperty('id');
                bookId = book.id;

            })

    })

    it("Deve atualizar todas as informações do livro", async () => {

        await request(app)
            .put(`/v1/book/update/${bookId}`)
            .set('Authorization', `${token}`)
            .send({
                title: "ORM Book to update",
                price: 80,
                genre: "Music",
                author: "Wilson da silva",
                pageCount: 360,
                publishedDate: '2013-10-10',
                synopsis: "Welcome to the enchanted forest!!!"
            })
            .expect(200)
            .then(response => {

                const bookEdited = response.body
                expect(bookEdited).toHaveProperty("id")

            })

    })

    it("Deve mudar titulo com int e receber um erro", async () => {

        await request(app)
            .put(`/v1/book/update/${bookId}`)
            .set('Authorization', `${token}`)
            .send({
                title: 403
            })
            .expect(400)
            .then(response => {

                const bookEdited = response.body

                const erro = JSON.parse(bookEdited.message)

                expect(erro).toEqual([
                    {
                        code: "invalid_type",
                        expected: "string",
                        received: "number",
                        path: ["title"],
                        message: "Expected string, received number"
                    },
                    {
                        code: "invalid_type",
                        expected: "string",
                        received: "undefined",
                        path: ["author"],
                        message: "Required"
                    },
                    {
                        code: "invalid_type",
                        expected: "string",
                        received: "undefined",
                        path: ["synopsis"],
                        message: "Required"
                    },
                    {
                        code: "invalid_type",
                        expected: "number",
                        received: "undefined",
                        path: ["price"],
                        message: "Required"
                    },
                    {
                        code: "invalid_type",
                        expected: "string",
                        received: "undefined",
                        path: ["genre"],
                        message: "Required"
                    },
                    {
                        code: "invalid_type",
                        expected: "string",
                        received: "undefined",
                        path: ["publishedDate"],
                        message: "Required"
                    },
                    {
                        code: "invalid_type",
                        expected: "number",
                        received: "undefined",
                        path: ["pageCount"],
                        message: "Required"
                    }
                ])

            })

    })

    afterAll(async () => {
        HTTPAdapter.close()

    })

})