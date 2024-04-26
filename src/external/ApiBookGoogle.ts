import { httpClientAdapterRepository } from "../adapters/httpClientAdapter/repository/httpClientAdapterRepository";

class ApiBookGoogle {

    httpClient: httpClientAdapterRepository
    constructor(httpClientAdapter: httpClientAdapterRepository) {

        this.httpClient = httpClientAdapter;

    }

    async findBook(title: string) {


        const params = {
            q: title,
            //inauthor: 'keyes',
            maxResults: 10,
            // langRestrict: 'en',
            //subject: 'Gardening',
            key: process.env.API_GOOGLE_KEY
        }

        const books = this.httpClient.get(params)

        return books

    }

}

export default ApiBookGoogle