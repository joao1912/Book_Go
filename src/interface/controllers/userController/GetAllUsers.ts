import { Request, Response } from "express";
import { GetAllUsersUseCase } from "../../../usecases/user/GetAllUsersUseCase";
import { getAllUsers } from "../../../adapters/ormAdapter/protocols/userProtocols";

class GetAllUsers {

    async handle(req: Request, res: Response) {

        try {
            
            const getAllUsersUseCase = new GetAllUsersUseCase(getAllUsers)

            const allUsers = await getAllUsersUseCase.execute()

            res.status(200).json(allUsers)

        } catch (error) {

            throw new Error('Bad Request: ' + error)
            
        }

    }

}

const getAllUsersController = new GetAllUsers()

export default getAllUsersController