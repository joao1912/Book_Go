import { createUser, updateUser, deleteUser } from "../../src/adapters/ormAdapter/protocols/userProtocols"
import { IUser, User } from "../../src/entities/User"
import { CreateUserUseCase } from "../../src/usecases/user/CreateUserUseCase"
import { UpdateUserUseCase } from "../../src/usecases/user/UpdateUserUseCase"
import { DeleteUserUseCase } from "../../src/usecases/user/DeleteUserUseCase"
import { deleteAllUsers } from "../../src/adapters/ormAdapter/protocols/userProtocols"
import { Book, IBook } from "../../src/entities/Book"
import { addBook } from "../../src/adapters/ormAdapter/protocols/bookProtocols"
import { createFavorite, deleteAllFavorites } from "../../src/adapters/ormAdapter/protocols/favoriteProtocols"
import { FavoriteBookUseCase } from "../../src/usecases/user/FavoriteBookUseCase"
import { deleteAllAuthors } from "../../src/adapters/ormAdapter/protocols/authorProtocols"
import { deleteAllComments } from "../../src/adapters/ormAdapter/protocols/commentProtocols"
import { deleteAllFinances } from "../../src/adapters/ormAdapter/protocols/financeProtocols"

describe('Testes do caso de uso do usuário', () => {

    let userIdToUpdate: string;
    let userIdToDelete: string;
    let bookCreatedId: string;

    beforeAll(async () => {

        const userToBeUpdated: Omit<IUser, 'id'> = {
            username: 'cleiton_teste1',
            password: 'cleiton123_teste1',
            email: 'cleiton_teste1@gmail.com',
             telephone: '5548978453627_teste1'
            
        }

        const userToBeDeleted: Omit<IUser, 'id'> = {
            username: 'cleiton_teste2',
            password: 'cleiton123_teste2',
                email: 'cleiton_teste2@gmail.com',
                telephone: '5548978453627_teste2'
            
        }

        const userToUpdete = await createUser.execute(userToBeUpdated)
        const userToDelete = await createUser.execute(userToBeDeleted)

        userIdToUpdate = userToUpdete.props.id
        userIdToDelete = userToDelete.props.id

        const bookTobeCreated: Omit<IBook, 'id'> = {
            title: "Um livro de teste 1",
            author: "Author de teste 1",
            synopsis: "blablabla 1",
            price: 12,
            genre: "teste"
        }

        const newBook1 = await addBook.execute(bookTobeCreated)

        bookCreatedId = newBook1.props.id

    })

    it('deve retornar o id do usuario criado', async () => {

        const createUserUseCase = new CreateUserUseCase(createUser)

        const userToBeCreated: Omit<IUser, 'id'> = {
            username: 'cleiton4',
            password: 'cleiton123',
                email: 'cleiton1@gmail.com',
                telephone: '5548978453627'
        }

        const user = await createUserUseCase.execute(userToBeCreated)

        expect(user.props.id).toHaveProperty('id')

    })


    it ('deve mudar todos os usuario, exceto o username', async() => {

        const updateUserUseCase = new UpdateUserUseCase(updateUser) 

        const updateToDo: Partial <IUser> = {
            id: userIdToUpdate,
            password: '123cleitinho',
                email: 'cleitao@hotmail.com',
                telephone: '51438888493'
            
        }

        const upUser = await updateUserUseCase.execute(updateToDo)

        expect(upUser).toEqual(updateToDo)
        expect(upUser).resolves.toBeInstanceOf(User)
        
    })

    it('deve deletar um usuario por id', async () => {

        const deleteUserUseCase = new DeleteUserUseCase(deleteUser)

        const result = await deleteUserUseCase.execute(userIdToDelete)
        
        expect(result).toStrictEqual({
            message: `O usuário de id: ${userIdToDelete} foi excluído com sucesso.`
        })

    })

    it('Deve favoritar um livro e retornar o livro favoritado', async () => {

        const favoriteBookUseCase = new FavoriteBookUseCase(createFavorite)

        const book = await favoriteBookUseCase.execute(userIdToUpdate, bookCreatedId)

        expect(book).resolves.toBeInstanceOf(Book)

    })

    afterAll(async () => {

        try {

            //await deleteAllUsers.execute()
            //await deleteAllAuthors.execute()
            //await deleteAllComments.execute()
            //await deleteAllFinances.execute()
            //await deleteAllFavorites.execute()
            
        } catch (error) {
            throw new Error('Internal server error: ' + error)
        }
        
    })
})

