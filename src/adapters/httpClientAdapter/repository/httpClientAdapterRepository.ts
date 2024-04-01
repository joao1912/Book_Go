import { IBook } from "../../../entities/Book";


export interface httpClientAdapterRepository {

    getHttpClient(): any 

    get(params: any): IBook[]

}