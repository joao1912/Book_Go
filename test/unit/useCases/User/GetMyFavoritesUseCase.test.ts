import { createUser } from "../../../../src/adapters/ormAdapter/protocols/userProtocols"
import { createFavorite, getAllFavoritesByUserId } from "../../../../src/adapters/ormAdapter/protocols/favoriteProtocols"
import { addBook } from "../../../../src/adapters/ormAdapter/protocols/bookProtocols";
import { GetMyFavorites } from "../../../../src/usecases/user/GetMyFavoritesUseCase";
import { Book } from "../../../../src/entities/Book";

describe('Teste do caso de uso de buscar todos os favoritos de um usuários', () => {

    let userId: string;
    let bookId1: string;
    let bookId2: string;

    beforeAll(async () => {

        await createUser.execute({
            email: 'emailParaBuscarFav@teste.com',
            password: 'senha',
            telephone: '9999999',
            username: 'nomeParaTeste'
        })
            .then(result => {

                const id = result.props.id;

                if (id != undefined) {

                    userId = id

                }

            })

        await addBook.execute({
            author: 'cleitin da massa',
            genre: 'massa',
            price: 40,
            synopsis: 'efmaiefmuenmf',
            title: 'A massa lendária'
        })
            .then(result => {

                const id = result.props.id

                if (id != undefined) {

                    bookId1 = id

                }

            })

        await addBook.execute({
            author: 'cleitin da massa2',
            genre: 'massa2',
            price: 45,
            synopsis: 'efmaiefmuenmf2',
            title: 'A massa lendária2'
        })
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