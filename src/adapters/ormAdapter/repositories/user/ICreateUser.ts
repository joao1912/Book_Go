import { User } from "../../../../entities/User"


export interface ICreateUser {
    execute(user: Omit<User, "id">): Promise<User>
}