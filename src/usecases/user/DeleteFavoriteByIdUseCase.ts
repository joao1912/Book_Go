import { IDeleteMessage } from "../../adapters/ormAdapter/repositories/favorite/IDeleteFavorite";
import { IDeleteFavorite } from "../../adapters/ormAdapter/repositories/favorite/IDeleteFavorite";
import { validatorAdapter } from "../../adapters/validatorAdapter/protocol";


export class DeleteFavoriteByIdUseCase {

    protected deleteFavoriteService: IDeleteFavorite

    constructor(ormAdapter: IDeleteFavorite) {

        this.deleteFavoriteService = ormAdapter

    }

    async execute(favoriteId: string | undefined): Promise<IDeleteMessage> {

        const validatedId = validatorAdapter.validateId(favoriteId) 
   
        return await this.deleteFavoriteService.execute(validatedId)

    }

}
