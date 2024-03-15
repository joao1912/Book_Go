import { User } from "../../../../entities/User"

export interface IGetAllUsers {
    execute(): Promise<User[] | void>
}
