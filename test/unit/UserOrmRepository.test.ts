import { createUser, updateUser } from "../../src/adapters/ormAdapter/protocols"
import { IUser } from "../../src/entities/User"
import { CreateUserUseCase } from "../../src/usecases/user/CreateUserUseCase"
import { UpdateUserUseCase } from "../../src/usecases/user/UpdateUserUseCase"



describe('testes do orm prisma, user repository', () => {

    it('deve retornar o id do usuario criado', async () => {

        const createUserUseCase = new CreateUserUseCase(createUser)

        const userToBeCreated: Omit<IUser, 'id'> = {
            username: 'cleiton',
            password: 'cleiton123',
            contact: {
                email: 'cleiton1@gmail.com',
                telephone: '5548978453627'
            }
        }

        const user = await createUserUseCase.execute(userToBeCreated)

        expect(user).toHaveProperty('id')

    })


    it ('deve mudar todos os usuario, exceto o username', async() => {

        const updateUserUseCase = new UpdateUserUseCase(updateUser) 

        const updateToDo: Partial <IUser> = {
            password: '123cleitinho',
            contact: {
                email: 'cleitao@hotmail.com',
                telephone: '51438888493'
            }
        }

        const upUser = await updateUserUseCase.execute(updateToDo)
        console.log("Up user: ", upUser)
        expect(upUser).toEqual(updateToDo)




    })
})

