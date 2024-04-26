import { httpClientAdapterRepository } from "../adapters/httpClientAdapter/repository/httpClientAdapterRepository";

class ApiBookGoogle {

    httpClient: httpClientAdapterRepository
    constructor(httpClientAdapter: httpClientAdapterRepository) {

        this.httpClient = httpClientAdapter;

    }

    async findBook(title: string, author?:string) {

        if(author){
            author = 'inauthor:' + author
        }
        const params = {
            q: title + author,
            maxResults: 10,
            langRestrict: 'en', //nao funcionou ainda
            // startIndex: 0 //para paginar ainda nao testei
            //subject: 'Gardening', //nao testado
            key: process.env.API_GOOGLE_KEY
        }

        const books = this.httpClient.get(params)

        return books

    }

}

export default ApiBookGoogle