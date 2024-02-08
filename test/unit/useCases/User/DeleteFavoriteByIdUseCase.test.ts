import { addBook } from "../../../../src/adapters/ormAdapter/protocols/bookProtocols";
import { createFavorite, deleteFavorite } from "../../../../src/adapters/ormAdapter/protocols/favoriteProtocols";
import { createUser } from "../../../../src/adapters/ormAdapter/protocols/userProtocols";
import { Book } from "../../../../src/entities/Book";
import { User } from "../../../../src/entities/User";
import { DeleteFavoriteByIdUseCase } from "../../../../src/usecases/user/DeleteFavoriteByIdUseCase";


describe('Teste do DeleteFavoiteByIdUseCase', () => {

    let userId: string;
    let bookId: string;
    let idFavoriteToBeDeleted: string;

    beforeAll(async () => {

        // Criar um user para o teste

        const user = {
            username: "Zoo",
            password: "4308",
            email: "zoo@gmail.com",
            telephone: "3322229450",
        };

        const userInstance = new User(user)

        await createUser.execute(userInstance)
            .then(result => {

                const id = result.props.id

                if (id != undefined) {
                    userId = id
                }

            })

        // Criar um livro

        const book = {
            author: 'cleitin da massa',
            genre: 'massa',
            price: 40,
            synopsis: 'efmaiefmuenmf',
            title: 'A massa lendária'
        }

        const bookInstance = new Book(book)

        await addBook.execute(bookInstance)
            .then(result => {

                const id = result.props.id

                if (id != undefined) {

                    bookId = id

                }

            })

        // Criar  um favorite

        await createFavorite.execute(userId, bookId)
            .then(result => {

                idFavoriteToBeDeleted = result.favoriteId

            })


    })

    it('Deve deletar um favorite por id', async () => {

        const deleteFavoriteUseCase = new DeleteFavoriteByIdUseCase(deleteFavorite)

        await deleteFavoriteUseCase.execute(idFavoriteToBeDeleted)
            .then(result => {

                expect(result.message).toBe('O livro foi removido dos favoritos')

            })
    })

})