import { IUser, User } from "../../../../entities/User"


export interface ICreateUser {
    execute(user: User): Promise<User | void>
}