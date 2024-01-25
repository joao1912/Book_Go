import { IUser } from "../../../../entities/User"

export interface IUpdateUser {
    execute(user: Partial<IUser> ): Promise<Partial<IUser>>
}
