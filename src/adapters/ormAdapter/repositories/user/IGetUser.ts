import { User } from "../../../../entities/User"

export interface IGetUser {
    execute(input: string): Promise<User>
}
