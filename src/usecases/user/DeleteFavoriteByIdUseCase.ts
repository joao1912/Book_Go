import { IDeleteMessage } from "../../adapters/ormAdapter/repositories/favorite/IDeleteFavorite";
import { IDeleteFavorite } from "../../adapters/ormAdapter/repositories/favorite/IDeleteFavorite";


export class DeleteFavoriteByIdUseCase {

    protected deleteFavoriteAdapter: IDeleteFavorite

    constructor(ormAdapter: IDeleteFavorite) {

        this.deleteFavoriteAdapter = ormAdapter

    }

    async execute(favoriteId: string): Promise<IDeleteMessage> {
   
        return await this.deleteFavoriteAdapter.execute(favoriteId)

    }

}