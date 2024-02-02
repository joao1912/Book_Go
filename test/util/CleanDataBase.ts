import { deleteAllAuthors } from "../../src/adapters/ormAdapter/protocols/authorProtocols"
import { deleteAllBooks } from "../../src/adapters/ormAdapter/protocols/bookProtocols"
import { deleteAllComments } from "../../src/adapters/ormAdapter/protocols/commentProtocols"
import { deleteAllFavorites } from "../../src/adapters/ormAdapter/protocols/favoriteProtocols"
import { deleteAllFinances } from "../../src/adapters/ormAdapter/protocols/financeProtocols"
import { deleteAllUsers } from "../../src/adapters/ormAdapter/protocols/userProtocols"

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

/* module.exports = async () => {

    await CleanDataBase.execute()

} */