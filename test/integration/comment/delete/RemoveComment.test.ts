import HTTPAdapter from "../../../../src/adapters/HTTPAdapter/protocol";
import request from "supertest";
import { IBook } from "../../../../src/entities/Book";
import { IComment } from "../../../../src/entities/Comment";

describe('## DELETE ##', () => {

    let app: any;
    let token: string;
    let userId: string;
    let bookId: string;
    let commentId: string;

    beforeAll(async () => {

        HTTPAdapter.config()
        app = HTTPAdapter.getApp()

        const userData = {
            username: "Jose alves",
            email: "JoseAlves@gmail.com",
            telephone: "34956473893"
        }

        await request(app)
            .post('/v1/users/signIn')
            .send({ ...userData, password: "Jose_123", })
            .expect(200)
            .then(response => {
            
                userId = response.body.user.id
                token = response.body.token

            })

        const addingBook: IBook = {
            title: "A Head Full of Dreams",
            synopsis: "Explore a jornada emocionante de uma das bandas mais icônicas da história da música, enquanto eles compartilham suas experiências, inspirações e aspirações neste cativante relato.",
            price: 20,
            author: "Coldplay",
            pageCount: 53,
            publishedDate: "2012-10-09",
            genre: "Music"
        }

        await request(app)
            .post('/v1/book/add')
            .set('Authorization', `${token}`)
            .send(addingBook)
            .expect(200)
            .then(response => {

                bookId = response.body.id

            })

        const comment: IComment = {
            bookId,
            userId,
            comment: "Um comentário criado para ser deletado"
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

    it('Deve remover um comentário criado', async () => {

        await request(app)
            .delete(`/v1/comment/removeComment/${commentId}`)
            .set('Authorization', token)
            .expect(200)
            .then(response => {

                expect(response.body.message).toBe('Comentário deletado com sucesso!')

            })

    })

})