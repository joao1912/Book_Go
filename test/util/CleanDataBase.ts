import { deleteAllAuthors } from "../../src/adapters/ormAdapter/protocols/authorProtocols.js"
import { deleteAllBooks } from "../../src/adapters/ormAdapter/protocols/bookProtocols.js"
import { deleteAllComments } from "../../src/adapters/ormAdapter/protocols/commentProtocols.js"
import { deleteAllFavorites } from "../../src/adapters/ormAdapter/protocols/favoriteProtocols.js"
import { deleteAllFinances } from "../../src/adapters/ormAdapter/protocols/financeProtocols.js"
import { deleteAllUsers } from "../../src/adapters/ormAdapter/protocols/userProtocols.js"

class CleanDataBase {

    public static async execute() {

        try {

            await deleteAllUsers.execute()
            await deleteAllAuthors.execute()
            await deleteAllComments.execute()
            await deleteAllFinances.execute()
            await deleteAllFavorites.execute()
            await deleteAllBooks.execute()
            
        } catch (error) {
            throw new Error('Internal server error: ' + error)
        }

    }

}


export default async () => {

    await CleanDataBase.execute()

}
