import { IDeleteFavorite } from "../../adapters/ormAdapter/repositories/favorite/IDeleteFavorite";


export class DeleteFavoriteUseCase {

    protected deleteFavorite: IDeleteFavorite;

    constructor(ormAdapter: IDeleteFavorite) {

        this.deleteFavorite = ormAdapter

    }

    async execute(favoriteId: string) {

        return await this.deleteFavorite.execute(favoriteId)

    }

}