import { IUser, User } from "../../../../entities/User"

export interface IUpdateUser {
    execute(user: User ): Promise<User>
}
