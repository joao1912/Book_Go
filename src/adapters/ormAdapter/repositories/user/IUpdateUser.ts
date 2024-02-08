import { IUser, User } from "../../../../entities/User"

export interface IUpdateUser {
    execute(user: Partial<User> ): Promise<Partial<User>>
}
