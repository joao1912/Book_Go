import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { IBook } from "../../entities/Book";
import { httpClientAdapterRepository } from "./repository/httpClientAdapterRepository";
import { CustomError } from "../../interface/controllers/utils/CustomError";

export interface ISearch extends AxiosRequestConfig<any> {
    intitle?: string;
    inauthor?: string;
    subjects?: string[]
}

class AxiosAdapter implements httpClientAdapterRepository {

    httpClient: AxiosInstance
    constructor() {

        this.httpClient = axios.create({
            baseURL: 'https://www.googleapis.com/books/v1'
        })

    }

    getHttpClient() {
        return this.httpClient
    }

    async get(params: ISearch): Promise<IBook[]> {

        if (!params) {
            throw new CustomError('ApiGoogleError', 'Needs params to search.', 400)
        }
        
        const booksData = await this.httpClient.get('/volumes', params)

        const everyBooks: IBook[] = []

        const data = booksData.data.itens

        for (let item of data) {

            const id = item.id

            const {
                title,
                authors,
                publishedDate,
                description,
                pageCount,
                categories,
                imageLinks
            } = item.volumeInfo

            const {
                smallThumbnail,
                thumbnail
            } = imageLinks

            const FormatedBook: IBook = {
                title: title,
                author: authors[0], //problema
                synopsis: description,
                price: item.saleInfo.listPrice.amount,
                genre: categories[0], //problema
                publishedDate: publishedDate,
                pageCount: pageCount,
                image: thumbnail
            }

            everyBooks.push(FormatedBook)
        }

        return everyBooks

    }

}

export default AxiosAdapter