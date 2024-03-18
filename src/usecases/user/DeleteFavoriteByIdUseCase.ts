import { IDeleteMessage } from "../../adapters/ormAdapter/repositories/favorite/IDeleteFavorite";
import { IDeleteFavorite } from "../../adapters/ormAdapter/repositories/favorite/IDeleteFavorite";
import { validatorAdapter } from "../../adapters/validatorAdapter/protocol";


export class DeleteFavoriteByIdUseCase {

    protected deleteFavoriteAdapter: IDeleteFavorite

    constructor(ormAdapter: IDeleteFavorite) {

        this.deleteFavoriteAdapter = ormAdapter

    }

    async execute(favoriteId: string | undefined): Promise<IDeleteMessage> {

        const validatedId = validatorAdapter.validateId(favoriteId) 
   
        return await this.deleteFavoriteAdapter.execute(validatedId)

    }

}