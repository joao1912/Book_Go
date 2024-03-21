import HTTPAdapter from "../../../../src/adapters/HTTPAdapter/protocol";
import request from "supertest";
import { IBook } from "../../../../src/entities/Book";
import { IComment } from "../../../../src/entities/Comment";

describe('## GET ##', () => {

    let app: any;
    let token1: string;
    let token2: string;
    let userId1: string;
    let bookId: string;
    let userId2: string;

    beforeAll(async () => {

        HTTPAdapter.config()
        app = HTTPAdapter.getApp()

        const userData1 = {
            username: "Joao Teixeira junior1",
            email: "JoaoTeixeiraJunior1@teste.com",
            telephone: "45948356678"
        }

        const userData2 = {
            username: "Joao Teixeira junior2",
            email: "JoaoTeixeiraJunior2@teste.com",
            telephone: "48958354667"
        }

        await request(app)
            .post('/v1/users/signIn')
            .send({ ...userData1, password: "Joao_123", })
            .expect(200)
            .then(response => {

                userId1 = response.body.user.id
                token1 = response.body.token

            })

        await request(app)
            .post('/v1/users/signIn')
            .send({ ...userData2, password: "JoaoJunior_123", })
            .expect(200)
            .then(response => {

                userId2 = response.body.user.id
                token2 = response.body.token

            })

        const addingBook: IBook = {
            title: "Aventura Sonora",
            synopsis: "Descubra um mundo de melodias e ritmos enquanto mergulha nesta emocionante exploração musical.",
            price: 20,
            author: "Coldplay",
            pageCount: 53,
            publishedDate: "2012-10-09",
            genre: "Music"
        }        

        await request(app)
            .post(`/v1/book/add`)
            .set('Authorization', `${token1}`)
            .send(addingBook)
            .expect(200)
            .then(response => {

                bookId = response.body.id

            })


        const comment1: IComment = {
            bookId,
            userId: userId1,
            comment: "Um comentário criado 1 "
        }

        const comment2: IComment = {
            bookId,
            userId: userId1,
            comment: "Um comentário criado 2"
        }

        const comment3: IComment = {
            bookId,
            userId: userId2,
            comment: "Um comentário criado 3"
        }

        await request(app)
            .post('/v1/comment/createComment')
            .set('Authorization', token1)
            .send(comment1)

        await request(app)
            .post('/v1/comment/createComment')
            .set('Authorization', token1)
            .send(comment2)

        await request(app)
            .post('/v1/comment/createComment')
            .set('Authorization', token2)
            .send(comment3)

    })

    it('Deve retornar todos os comentários de um livro', async () => {

        await request(app)
            .get(`/v1/comment/searchAllComments/${bookId}`)
            .set('Authorization', token1)
            .expect(200)
            .then(response => {

                expect(response.body.length).toBeGreaterThanOrEqual(3)

            })

    })

})