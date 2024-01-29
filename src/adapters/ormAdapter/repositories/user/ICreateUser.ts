import { IUser } from "../../../../entities/User"


export interface ICreateUser {
    execute(user: Omit<IUser, "id">): Promise<IUser>
}