import { updateUser } from "../../../../src/adapters/ormAdapter/protocols/userProtocols"
import { User } from "../../../../src/entities/User"
import { UpdateUserUseCase } from "../../../../src/usecases/user/UpdateUserUseCase"


describe("Alterar propriedades do usuário", ()=>{
    let userIdToUpdate: string;

    beforeAll(async ()=>{
        const userToBeUpdated = new User({
            username: 'cleiton_teste1',
            password: 'cleiton123_teste1',
            email: 'cleiton_teste1@gmail.com',
             telephone: '5548978453627_teste1'
            
        })

    })


    it ('deve mudar todos os usuario, exceto o username', async() => {

        const updateUserUseCase = new UpdateUserUseCase(updateUser) 

        const updateToDo = new User ({
            id: userIdToUpdate,
            password: '123cleitinho',
            email: 'cleitao@hotmail.com',
            telephone: '51438888493',
            username: 'cleiton_teste1'
            
        })

        const upUser = await updateUserUseCase.execute(updateToDo)

        expect(upUser.props).toEqual(updateToDo)
        expect(upUser).toBeInstanceOf(User)
        
    })
})