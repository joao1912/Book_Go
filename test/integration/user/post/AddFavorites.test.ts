import HTTPAdapter from "../../../../src/adapters/HTTPAdapter/protocol"
import request from "supertest";
import { IUser } from "../../../../src/entities/User";
import { IBook } from "../../../../src/entities/Book";

describe('## POST ##', () => {

    let app: any;
    let token: string;
    let user: IUser;
    let bookId: string;

    beforeAll(async () => {

        HTTPAdapter.config()
        app = HTTPAdapter.getApp()

        user = {
            email: 'userToFavoriteTest@gmail.com',
            password: 'Teste_123',
            telephone: '00000000000',
            username: 'userToFavoriteTests',
        }

        const book: IBook = {
            title: "O Eco dos Sonhos",
            synopsis: "Navegue pelos labirintos da mente humana através destes poemas que ecoam os sonhos mais profundos e os desejos mais secretos. Uma jornada poética que convida você a explorar os recantos mais íntimos da imaginação.",
            price: 19,
            author: "Emily Dickinson",
            pageCount: 68,
            publishedDate: "1862-11-01",
            genre: "Poesia"
        }

        await request(app)
            .post('/v1/users/signIn')
            .send(user)
            .then(response => {

                token = response.body.token;

            })

        await request(app)
            .post('/v1/book/add')
            .set('Authorization', token)
            .send(book)
            .then(response => {

                bookId = response.body.id

            })

    })

    it('Deve adicionar um favorito a um usuário', async () => {

        await request(app)
            .post(`/v1/users/addFavorite/${bookId}`)
            .set('Authorization', token)
            .expect(200)
            .then(response => {

                expect(response.body.book.id).toBe(bookId)

            })

    })

})