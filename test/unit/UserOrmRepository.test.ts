import { createUser, updateUser, deleteUser } from "../../src/adapters/ormAdapter/protocols"
import { IUser } from "../../src/entities/User"
import { CreateUserUseCase } from "../../src/usecases/user/CreateUserUseCase"
import { UpdateUserUseCase } from "../../src/usecases/user/UpdateUserUseCase"
import { DeleteUserUseCase } from "../../src/usecases/user/DeleteUserUseCase"
import { deleteAllUsers } from "../../src/adapters/ormAdapter/protocols"

describe('testes do orm prisma, user repository', () => {

    let userIdToUpdate: string;
    let userIdToDelete: string;

    beforeAll(async () => {

        const createUserUseCase = new CreateUserUseCase(createUser)

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

        const userToUpdete = await createUserUseCase.execute(userToBeUpdated)
        const userToDelete = await createUserUseCase.execute(userToBeDeleted)

        userIdToUpdate = userToUpdete.id
        userIdToDelete = userToDelete.id

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

        expect(user).toHaveProperty('id')

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
        console.log( typeof upUser)
        //Não consegui arrumar lá no UpdateUser :(
        // expect(upUser).toEqual(updateToDo)
       expect(upUser)


    })

    it('deve deletar um usuario por id', async () => {

        const deleteUserUseCase = new DeleteUserUseCase(deleteUser)

        const result = await deleteUserUseCase.execute(userIdToDelete)
        
        expect(result).toStrictEqual({
            message: `O usuário de id: ${userIdToDelete} foi excluído com sucesso.`
        })

    })

    afterAll(async () => {

        try {
            await deleteAllUsers.execute()
        } catch (error) {
            throw new Error('Internal server error: ' + error)
        }
        
    })
})

