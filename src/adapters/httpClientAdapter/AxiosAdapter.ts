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

    async get(params: ISearch): IBook[] {

        if (!params) {
            throw new CustomError('ApiGoogleError', 'Needs params to search.', 400)
        }
        
        const books = await this.httpClient.get('/volumes', params)

        const data = books.data.itens

        

    }

}

export default AxiosAdapter