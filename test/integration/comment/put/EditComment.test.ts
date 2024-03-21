import HTTPAdapter from "../../../../src/adapters/HTTPAdapter/protocol";
import request from "supertest";
import { IBook } from "../../../../src/entities/Book";
import { IComment } from "../../../../src/entities/Comment";


describe('## PUT ##', () => {

    let app: any;
    let token: string;
    let userId: string;
    let bookId: string;
    let commentId: string;

    beforeAll(async () => {

        HTTPAdapter.config()
        app = HTTPAdapter.getApp()

        const userData = {
            username: "Daniel Komers",
            email: "DanielKomers@teste.com",
            telephone: "48997463543"
        }

        await request(app)
            .post('/v1/users/signIn')
            .send({ ...userData, password: "Daniel_123", })
            .expect(200)
            .then(response => {

                userId = response.body.user.id
                token = response.body.token

            })

        const addingBook: IBook = {
            title: "Harmonias Celestiais",
            synopsis: "Deixe-se levar pelas melodias divinas deste registro musical, onde cada nota é uma expressão da beleza e da transcendência.",
            price: 20,
            author: "Coldplay",
            pageCount: 53,
            publishedDate: "2012-10-09",
            genre: "Music"
        }        

        await request(app)
            .post(`/v1/book/add`)
            .set('Authorization', `${token}`)
            .send(addingBook)
            .expect(200)
            .then(response => {

                bookId = response.body.id

            })

        const comment: IComment = {
            bookId,
            userId,
            comment: "Um comentário criado para edição"
        }

        await request(app)
            .post('/v1/comment/createComment')
            .set('Authorization', token)
            .send(comment)
            .expect(200)
            .then(response => {

                commentId = response.body.id

            })

    })

    it('Deve editar um comentário já criado', async () => {

        const newValue: IComment = {
            id: commentId,
            bookId: bookId,
            userId: userId,
            comment: "O comentário ja foi editado."
        }

        await request(app)
            .put('/v1/comment/editComment/')
            .set('Authorization', token)
            .send(newValue)
            .expect(200)
            .then(response => {

                expect(response.body.comment).toBe('O comentário ja foi editado.')

            })

    })

})