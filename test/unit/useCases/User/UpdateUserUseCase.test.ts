import { createUser, updateUser } from "../../../../src/adapters/ormAdapter/protocols/userProtocols"
import { IUser, User } from "../../../../src/entities/User"
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

        const userData = await createUser.execute(userToBeUpdated)

        if(userData instanceof User){userIdToUpdate = userData.props.id}

    })


    it ('deve mudar todos os usuario, exceto o username', async() => {

        const updateUserUseCase = new UpdateUserUseCase(updateUser) 

        const updateToDo: IUser ={
            id: userIdToUpdate,
            password: '123cleitinho',
            email: 'cleitao@hotmail.com',
            telephone: '51438888493',
            username: 'cleiton_teste1'
            
        }

        const upUser = await updateUserUseCase.execute(updateToDo)
        if(upUser instanceof User)
        expect(upUser.props?.username).toEqual(updateToDo.username)
        expect(upUser).toBeInstanceOf(User)
        
    })
})