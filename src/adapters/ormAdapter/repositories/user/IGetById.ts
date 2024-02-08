import { User } from "../../../../entities/User"

export interface IGetById {
    execute(id: string): Promise<User | null>
}
