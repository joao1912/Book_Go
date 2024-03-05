import HTTPAdapter from "../../../../src/adapters/HTTPAdapter/protocol";
import request from "supertest";
import { IUser } from "../../../../src/entities/User";
import { IBook } from "../../../../src/entities/Book";

describe('## DELETE ##', () => {

    let token: string;
    let app: any;
    let user: IUser;
    let bookId: string;
    let favoriteId: string;


    beforeAll(async () => {

        HTTPAdapter.config()
        app = HTTPAdapter.getApp()

        user = {
            email: 'userToDeleteFavoriteTest@teste.com',
            password: 'umaSenhaParaTeste',
            telephone: '00101001010',
            username: 'userToDeleteFavoriteTest',
        }

        const book: IBook = {
            title: "O livro de testes do remove favorite",
            author: "Author",
            synopsis: "bla bla",
            price: 10,
            genre: "teste",
            publishedDate: "2024-12-20",
            pageCount: 235
        }

        await request(app)
            .post('/v1/users/signIn')
            .send(user)
            .expect(200)
            .then(response => {

                token = response.body.token;

            })

        await request(app)
            .post('/v1/book/add')
            .set('Authorization', token)
            .send(book)
            .expect(200)
            .then(response => {

                bookId = response.body.id

            })

        await request(app)
            .post(`/v1/users/addFavorite/${bookId}`)
            .set('Authorization', token)
            .expect(200)
            .then(response => {

                favoriteId = response.body.favoriteId 

            })
            

    })

    it('Deve remover o favorito de um usuário', async () => {

        await request(app)
        .delete(`/v1/users/removeFavorite/${favoriteId}`)
        .set('Authorization', token)
        .expect(200)

    })

})