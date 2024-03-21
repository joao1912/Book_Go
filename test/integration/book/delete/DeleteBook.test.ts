import request from "supertest"
import HTTPAdapter from "../../../../src/adapters/HTTPAdapter/protocol"
import { IBook } from "../../../../src/entities/Book";

describe('## DELETE ##', () => {

    let app: any;
    let token: string;
    let id: string

    const Book1: IBook = {
        title: "Adeus",
        synopsis: "Usado nas construções",
        price: 80,
        author: "Pedro Pedreiro",
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
                password: "123.aB",
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

                const book = response.body
                expect(book).toHaveProperty("id")
                id = book.id

            })

    })

    it("Deve deletar livro e receber mensagem", async () => {

        await request(app)
            .delete(`/v1/book/delete/${id}`)
            .set('Authorization', `${token}`)
            .expect(200)
            .then(response => {

                expect(response.body).toEqual({
                    message: `The book with ID ${id} and title "${Book1.title}" has been successfully deleted.`
                })

            })

    })


    it("Deve tentar deletar livro com id inexistente", async () => {

        const fakeId = "4e9855f6-17a7-4c04-9d41-f663579d1766"
        await request(app)
            .delete(`/v1/book/delete/${fakeId}`)
            .set('Authorization', `${token}`)
            .expect(404)
            .then(response => {

                expect(response.body).toEqual({
                    message: `Id provided does not exist.`
                })

            })

    })

    it("Deve tentar deletar livro sem token e receber um erro", async () => {

        await request(app)
            .delete(`/v1/book/delete/${id}`)
            .expect(401)
            .then(response => {

                expect(response.body).toEqual({message: 'Must have an authorization token'})

            })
        
    })

    afterAll(async () => {
        
        HTTPAdapter.close()

    })

})