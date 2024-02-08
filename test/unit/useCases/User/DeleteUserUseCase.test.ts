import { createUser, deleteUser } from "../../../../src/adapters/ormAdapter/protocols/userProtocols"
import { User } from "../../../../src/entities/User";
import { DeleteUserUseCase } from "../../../../src/usecases/user/DeleteUserUseCase"

describe("Delete um usuario", ()=>{
   
    let userIdToDelete: string;

    beforeAll(async()=>{

        const userToBeDeleted = new User ({
            username: 'cleiton_teste2',
            password: 'cleiton123_teste2',
                email: 'cleiton_teste2@gmail.com',
                telephone: '5548978453627_teste2'
            
        })

        const userToDelete = await createUser.execute(userToBeDeleted)

        if(userToDelete.props.id){userIdToDelete = userToDelete.props.id}
    })

    it('deve deletar um usuario por id', async () => {

        const deleteUserUseCase = new DeleteUserUseCase(deleteUser)
    
        const result = await deleteUserUseCase.execute(userIdToDelete)
        
        expect(result).toStrictEqual({
            message: `O usuário de id: ${userIdToDelete} foi excluído com sucesso.`
        })
    
    })



})
