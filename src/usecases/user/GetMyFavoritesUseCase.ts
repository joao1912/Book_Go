import { GetAllFavoritesByUserId } from "../../adapters/ormAdapter/prismaAdapter/favorite/GetAllFavoritesByUserId";
import { validatorAdapter } from "../../adapters/validatorAdapter/protocol";


export class GetMyFavoritesUseCase {

    protected getFavoritesAdapter: GetAllFavoritesByUserId;

    constructor(ormAdapter: GetAllFavoritesByUserId) {
        this.getFavoritesAdapter = ormAdapter
    }

    async execute(userId: string | undefined) {

        const validatedUserId = validatorAdapter.validateId(userId) 

        const favorites = await this.getFavoritesAdapter.execute(validatedUserId)

        return favorites

    }

}