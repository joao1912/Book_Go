import { IUser } from "../../../../entities/User"

export interface IGetAllUsers {
    execute(): Promise<IUser[]>
}
