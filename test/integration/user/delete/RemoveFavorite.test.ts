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
            email: 'userToDeleteFavoriteTest@gmail.com',
            password: 'Teste_123',
            telephone: '9983367899',
            username: 'userToDeleteFavoriteTest',
        }

        const book: IBook = {
            title: "Vozes da Natureza",
            synopsis: "Deixe-se envolver pelas melodias da natureza, capturadas nestes versos que ecoam o sussurro das árvores, o canto dos pássaros e o murmúrio dos rios. Uma celebração poética da beleza e da harmonia do mundo natural.",
            price: 16,
            author: "Mary Oliver",
            pageCount: 56,
            publishedDate: "1992-06-15",
            genre: "Poesia"
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