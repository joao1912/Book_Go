import { createUser } from "../../../../src/adapters/ormAdapter/protocols/userProtocols"
import { createFavorite, getAllFavoritesByUserId } from "../../../../src/adapters/ormAdapter/protocols/favoriteProtocols"
import { addBook } from "../../../../src/adapters/ormAdapter/protocols/bookProtocols";
import { GetMyFavorites } from "../../../../src/usecases/user/GetMyFavoritesUseCase";
import { Book } from "../../../../src/entities/Book";
import { User } from "../../../../src/entities/User";

describe('Teste do caso de uso de buscar todos os favoritos de um usuários', () => {

    let userId: string;
    let bookId1: string;
    let bookId2: string;

    beforeAll(async () => {

        const user = {
            email: 'emailParaBuscarFav@teste.com',
            password: 'senha',
            telephone: '9999999',
            username: 'nomeParaTeste'
        }

        const userInstance = new User(user)

        await createUser.execute(userInstance)
            .then(result => {

                const id = result.props.id;

                if (id != undefined) {

                    userId = id

                }

            })

        const book1 = {
            author: 'cleitin da massa1',
            genre: 'massa1',
            price: 40,
            synopsis: 'efmaiefmuenmf1',
            title: 'A massa lendária1',
            pageCount: 83,
            publishedDate: '2021-04-09',
        }

        const book2 = {
            author: 'cleitin da massa2',
            genre: 'massa2',
            price: 40,
            synopsis: 'efmaiefmuenmf2',
            title: 'A massa lendária2',
            pageCount: 63,
            publishedDate: '2007-04-09',
        }

        const bookInstance1 = new Book(book1)
        const bookInstance2 = new Book(book2)

        await addBook.execute(bookInstance1)
            .then(result => {

                const id = result.props.id

                if (id != undefined) {

                    bookId1 = id

                }

            })

        await addBook.execute(bookInstance2)
            .then(result => {

                const id = result.props.id

                if (id != undefined) {

                    bookId2 = id

                }

            })

        await createFavorite.execute(userId, bookId1)
        await createFavorite.execute(userId, bookId2)

    })

    it('deve buscar todos os favoritos do usuário por id', async () => {

        const getMyFavorites = new GetMyFavorites(getAllFavoritesByUserId)

        await getMyFavorites.execute(userId)
            .then(result => {

                expect(result.length).toBeGreaterThan(0)
                expect(result[0]).toBeInstanceOf(Book)
                

            })

    })

})