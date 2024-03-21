import request from "supertest";
import HTTPAdapter from "../../../../src/adapters/HTTPAdapter/protocol";
import { IComment } from "../../../../src/entities/Comment";
import { IBook } from "../../../../src/entities/Book";


describe('## GET ##', () => {

    let app: any;
    let token: string;
    let bookId: string;
    let userId: string;

    beforeAll(async () => {

        HTTPAdapter.config()
        app = HTTPAdapter.getApp()

        const userData = {
            username: "Joao Teixeira",
            email: "JoaoTeixeira@teste.com",
            telephone: "48958453685"
        }

        await request(app)
            .post('/v1/users/signIn')
            .send({ ...userData, password: "Joao_123", })
            .expect(200)
            .then(response => {

                userId = response.body.user.id
                token = response.body.token

            })

        const addingBook: IBook = {
            title: "Sinfonia da Alma",
            synopsis: "Embale-se nas notas emocionantes desta jornada musical, onde cada acorde conta uma história de amor, perda e redescoberta.",
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


        const comment1: IComment = {
            bookId,
            userId,
            comment: "Um comentário criado 1 "
        }

        const comment2: IComment = {
            bookId,
            userId,
            comment: "Um comentário criado 2"
        }

        const comment3: IComment = {
            bookId,
            userId,
            comment: "Um comentário criado 3"
        }

        await request(app)
            .post('/v1/comment/createComment')
            .set('Authorization', token)
            .send(comment1)

        await request(app)
            .post('/v1/comment/createComment')
            .set('Authorization', token)
            .send(comment2)

        await request(app)
            .post('/v1/comment/createComment')
            .set('Authorization', token)
            .send(comment3)

    })

    it('Deve retornar todos os comentários criados', async () => {

        await request(app)
            .get('/v1/comment/myComments')
            .set('Authorization', token)
            .expect(200)
            .then(response => {

                expect(response.body.length).toBeGreaterThan(1)

            })

    })

})