import HTTPAdapter from "../../../../src/adapters/HTTPAdapter/protocol";
import { IBook } from "../../../../src/entities/Book";
import { IComment } from "../../../../src/entities/Comment";
import request from "supertest";

describe('## POST ##', () => {

    let app: any;
    let userId: any;
    let bookId: any;
    let token: string;

    beforeAll(async () => {

        HTTPAdapter.config()
        app = HTTPAdapter.getApp()

        const userData = {
            username: "joacir Teixeira",
            email: "joacirTeixeira@teste.com",
            telephone: "48345678935"
        }

        await request(app)
            .post('/v1/users/signIn')
            .send({ ...userData, password: "Joacir_123", })
            .expect(200)
            .then(response => {

                userId = response.body.user.id
                token = response.body.token

            })

        const addingBook: IBook = {
            title: "Um nome para testar o create do comment",
            synopsis: "bla bla bla bla",
            price: 20,
            author: "Coldplay",
            pageCount: 53,
            publishedDate: '2012-10-09',
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

    })

    it('Deve criar um comentário', async () => {

        const commentData: IComment = {
            bookId: bookId,
            userId: userId,
            comment: "Acho que esse livro merece ter mais páginas."
        }

        await request(app)
            .post('/v1/comment/createComment')
            .set('Authorization', token)
            .send(commentData)
            .expect(200)
            .then(response => {

                expect(response.body.comment).toBe('Acho que esse livro merece ter mais páginas.')
                    
            })
    })

})