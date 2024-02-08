import { addBook } from "../../../../src/adapters/ormAdapter/protocols/bookProtocols";
import { createFavorite, deleteFavorite } from "../../../../src/adapters/ormAdapter/protocols/favoriteProtocols";
import { createUser } from "../../../../src/adapters/ormAdapter/protocols/userProtocols";
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

        await createUser.execute(user)
            .then(result => {

                userId = result.props.id

            })

        // Criar um livro

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