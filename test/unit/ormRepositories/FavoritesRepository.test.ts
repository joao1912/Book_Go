import { addBook } from "../../../src/adapters/ormAdapter/protocols/bookProtocols";
import { createFavorite, deleteFavorite, getAllFavoritesByUserId } from "../../../src/adapters/ormAdapter/protocols/favoriteProtocols";
import { createUser } from "../../../src/adapters/ormAdapter/protocols/userProtocols";
import { Book } from "../../../src/entities/Book";
import { User } from "../../../src/entities/User";

interface IFavoriteToBeSearch {
    id?: string;
    name: 'nome_para_busca';
    description: 'uma descrição';
}

interface IFavoriteToBeUpdate {
    id?: string;
    name: 'nome_para_update';
    description: 'uma descrição';
}

interface IUserToFavoriteTest {
    id?: string;
    username: 'JoaoPedro';
    email: 'joaopedro@email.com';
    telephone: '5548998332714';
    password: 'senha_segura';
}

describe('Testes do FavoriteRepository', () => {

    let idFavoriteToBeDelete: string;
    let idFavoriteToBeSearch: string;
    let idFavoriteToBeUpdate: string;

    let userId: string;
    let bookId1: string;
    let bookId2: string;

    beforeAll(async () => {

        // Criar um usuário para os testes

        const user: IUserToFavoriteTest = {
            username: 'JoaoPedro',
            email: 'joaopedro@email.com',
            telephone: '5548998332714',
            password: 'senha_segura'
        }



        const userInstance = new User(user)

        await createUser.execute(userInstance)
            .then(result => {

                const id = result.props.id

                if (id != undefined) {
                    userId = id
                }

            })

        // Crir um livro para os testes

        const book1 = {
            title: "Aventuras de um Viajante",
            author: "Um author",
            synopsis: "Um jovem parte em uma jornada épica pelo mundo em busca de conhecimento e aventura.",
            price: 15,
            pageCount: 123,
            publishedDate: '2003-10-09',
            genre: "teste"
            
        }

        const book2 = {
            title: "Segredos do Deserto",
            author: "Um author2",
            synopsis: "Um romance envolvente ambientado nos vastos desertos do Oriente Médio.",
            price: 15,
            pageCount: 123,
            publishedDate: '2003-10-09',
            genre: "teste2"
        }

        const bookInstance1 = new Book(book1)

        await addBook.execute(bookInstance1)
            .then(result => {

                if (typeof result != 'string') {
                    const id = result.props.id

                    if (id != undefined) {
                        bookId1 = id
                    }
                }

                

            })

        const bookInstance2 = new Book(book2)

        await addBook.execute(bookInstance2)
            .then(result => {

                if (typeof result != 'string') {

                    const id = result.props.id

                    if (id != undefined) {
                        bookId2 = id
                    }
                    
                }
            })

        await createFavorite.execute(userId, bookId2)
            .then(result => {

                idFavoriteToBeDelete = result.favoriteId

            })


    })

    it('Deve criar um favorite', async () => {

        await createFavorite.execute(userId, bookId1)
            .then(result => {

                const { book, favoriteId } = result

                if (favoriteId != undefined) {

                    expect(book).toBeInstanceOf(Book)

                }

            })

    })

    it('Deve deletar um favorite', async () => {

        await deleteFavorite.execute(idFavoriteToBeDelete)
            .then(result => {

                expect(result.message).toBe('O livro foi removido dos favoritos')

            })
    })

    it('Deve buscar todos os favorites', async () => {

        await getAllFavoritesByUserId.execute(userId)
            .then(result => {

                expect(result.length).toBeGreaterThan(0)
                expect(result[0]).toBeInstanceOf(Book)

            })

    })

})