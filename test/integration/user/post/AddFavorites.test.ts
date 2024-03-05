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
            email: 'userToFavoriteTest@teste.com',
            password: 'umaSenhaParaTeste',
            telephone: '00000000000',
            username: 'userToFavoriteTests',
        }

        const book: IBook = {
            title: "O livro de testes do livro favorito",
            author: "Author",
            synopsis: "bla bla",
            price: 10,
            genre: "teste",
            publishedDate: "2024-12-20",
            pageCount: 232
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