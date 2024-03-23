import { GetAllFavoritesByUserId } from "../../adapters/ormAdapter/prismaAdapter/favorite/GetAllFavoritesByUserId";
import { validatorAdapter } from "../../adapters/validatorAdapter/protocol";


export class GetMyFavoritesUseCase {

    protected getFavoritesService: GetAllFavoritesByUserId;

    constructor(ormAdapter: GetAllFavoritesByUserId) {

        this.getFavoritesService = ormAdapter
        
    }

    async execute(userId: string | undefined) {

        const validatedUserId = validatorAdapter.validateId(userId) 

        const favorites = await this.getFavoritesService.execute(validatedUserId)

        return favorites

    }

}