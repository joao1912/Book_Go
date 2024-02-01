import { IUser, User } from "../../../../entities/User"

export interface IUpdateUser {
    execute(user: Partial<IUser> ): Promise<Partial<User>>
}
