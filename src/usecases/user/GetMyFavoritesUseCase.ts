import { GetAllFavoritesByUserId } from "../../adapters/ormAdapter/prismaAdapter/favorite/GetAllFavoritesByUserId";


export class GetMyFavorites {

    protected getFavoritesAdapter: GetAllFavoritesByUserId;

    constructor(ormAdapter: GetAllFavoritesByUserId) {
        this.getFavoritesAdapter = ormAdapter
    }

    async execute(userId: string) {

        const favorites = await this.getFavoritesAdapter.execute(userId)

        return favorites

    }

}