import { User } from "../../../../entities/User"

export interface IGetUser {
    execute(id: string): Promise<User |string>
}
