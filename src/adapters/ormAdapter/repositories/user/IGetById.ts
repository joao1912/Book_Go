import { IUser } from "../../../../entities/User"

export interface IGetById {
    execute(id: string): Promise<IUser | null>
}
