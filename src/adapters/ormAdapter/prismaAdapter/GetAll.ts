import { IUser } from "../../../entities/User";

export interface IGetAll {
    execute(): Promise<IUser[]>
}

export class GetAll {
    
    execute() {



    }

}

