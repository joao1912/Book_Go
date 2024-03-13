import { GetAllFavoritesByUserId } from "../../adapters/ormAdapter/prismaAdapter/favorite/GetAllFavoritesByUserId.js";


export class GetMyFavoritesUseCase {

    protected getFavoritesAdapter: GetAllFavoritesByUserId;

    constructor(ormAdapter: GetAllFavoritesByUserId) {
        this.getFavoritesAdapter = ormAdapter
    }

    async execute(userId: string) {

        const favorites = await this.getFavoritesAdapter.execute(userId)

        return favorites

    }

}