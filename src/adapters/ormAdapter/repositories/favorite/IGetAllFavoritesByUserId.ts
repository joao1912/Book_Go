import { Book } from "../../../../entities/Book";


export interface IGetAllFavoritesByUserId {

    execute(userId: string): Promise<Book[]>

}