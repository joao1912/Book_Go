import request from "supertest"
import HTTPAdapter from "../../../../src/adapters/HTTPAdapter/protocol"
import { IBook } from "../../../../src/entities/Book";

describe('## PUT ##', () => {

    let app: any;
    let bookId: string;
    let token: string;

    const Book1: IBook = {
        title: "O Livro do Update",
        synopsis: "Usado nas construções mais incriveis que se pode fazer!",
        price: 80,
        author: "Pedro Cascau",
        pageCount: 23,
        publishedDate: '2014-10-09',
        genre: "Art"
    }

    const newValues: IBook = {
        title: "O Livro do update que foi alterado",
        synopsis: "Usado nas construções, pena que ja foi alterado, agora é só esperar!",
        price: 60,
        author: "Pedro Cascau",
        pageCount: 40,
        publishedDate: '2014-11-09',
        genre: "Art V2"
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
            .send(newValues)
            .expect(200)
            .then(response => {

                const bookEdited = response.body
                expect(bookEdited).toHaveProperty("id")
               
                expect(bookEdited).toEqual({ id: bookId, ...newValues })

            })

    })

    it("Deve atualizar apenas o 'title' do livro", async () => {

        await request(app)
            .put(`/v1/book/update/${bookId}`)
            .set('Authorization', `${token}`)
            .send(newValues.title)
            .expect(200)
            .then(response => {

                const bookEdited = response.body
                expect(bookEdited).toHaveProperty("id")
                expect(bookEdited).toEqual({ id: bookId, title: newValues.title, ...bookEdited })

            })

    })

    it("Deve atualizar apenas o 'synopsis' do livro", async () => {

        await request(app)
            .put(`/v1/book/update/${bookId}`)
            .set('Authorization', `${token}`)
            .send({synopsis: newValues.synopsis})
            .expect(200)
            .then(response => {

                const bookEdited = response.body
                expect(bookEdited).toHaveProperty("id")
                expect(bookEdited).toEqual({ id: bookId, synopsis: newValues.synopsis, ...bookEdited })

            })

    })

    it("Deve atualizar apenas o 'price' do livro", async () => {

        await request(app)
            .put(`/v1/book/update/${bookId}`)
            .set('Authorization', `${token}`)
            .send({price: newValues.price})
            .expect(200)
            .then(response => {

                const bookEdited = response.body
                expect(bookEdited).toHaveProperty("id")
                expect(bookEdited).toEqual({ id: bookId, price: newValues.price, ...bookEdited })

            })

    })

    it("Deve atualizar apenas o 'pageCount' do livro", async () => {

        await request(app)
            .put(`/v1/book/update/${bookId}`)
            .set('Authorization', `${token}`)
            .send({pageCount: newValues.pageCount})
            .expect(200)
            .then(response => {

                const bookEdited = response.body
                expect(bookEdited).toHaveProperty("id")
                expect(bookEdited).toEqual({ id: bookId, pageCount: newValues.pageCount, ...bookEdited })

            })

    })

    it("Deve atualizar apenas o 'genre' do livro", async () => {

        await request(app)
            .put(`/v1/book/update/${bookId}`)
            .set('Authorization', `${token}`)
            .send({genre: newValues.genre})
            .expect(200)
            .then(response => {

                const bookEdited = response.body
                expect(bookEdited).toHaveProperty("id")
                expect(bookEdited).toEqual({ id: bookId, genre: newValues.genre, ...bookEdited })

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

                const erro = response.body

                expect(erro).toEqual({ message: 'Invalid input type provided.' })

            })

    })

    afterAll(async () => {

        HTTPAdapter.close()

    })

})