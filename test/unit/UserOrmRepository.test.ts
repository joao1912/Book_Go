import { createUser } from "../../src/adapters/ormAdapter/protocols"
import { IUser } from "../../src/entities/User"
import { CreateUserUseCase } from "../../src/usecases/user/CreateUserUseCase"



describe('testes do orm prisma, user repository', () => {

    it('deve retornar o id do usuario criado', async () => {

        const createUserUseCase = new CreateUserUseCase(createUser)

        const userByCreate: Omit<IUser, 'id'> = {
            username: 'cleiton',
            password: 'cleiton123',
            contact: {
                email: 'cleiton1@gmail.com',
                telephone: '5548978453627'
            }
        }

        const user = await createUserUseCase.execute(userByCreate)

        expect(user).toHaveProperty('id')

    })

})