import { IUser } from "../../../../entities/User"

export interface IUpdateUser {
    execute(user: ): Promise<IUser[]>
}
