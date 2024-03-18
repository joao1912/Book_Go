
import { z,  ZodType } from "zod";

export interface IBook {
    id?: string;
    title: string;
    author: string;
    synopsis: string;
    price: number;
    genre: string;
    publishedDate: string;
    pageCount: number;
    image?: any

}

export const bookSchema = z.object({
    id: z.string().optional(),
    title: z.string().min(3, { message: 'O nome precisa de no minimo 3 caracteres.' }),
    author: z.string().min(6, { message: 'O nome precisa de no minimo 6 caracteres.' }),
    synopsis: z.string().min(20, { message: 'A descrição precisa de no minimo 20 caracteres.' }),
    price: z.number(),
    genre: z.string(),
    publishedDate: z.string(),
    pageCount: z.number(),
    image: z.any().optional()
  
}) satisfies ZodType<IBook>


export class Book {

    public readonly props: IBook


    constructor(props: IBook) {

        const { id, title, synopsis, genre, price, author, publishedDate, pageCount, image } = props
        this.props = props



    }

    get Book() {
        return {
            id: this.props.id,
            title: this.props.title,
            synopsis: this.props.synopsis,
            price: this.props.price,
            publishedDate: this.props.publishedDate,
            pageCount: this.props.pageCount,
            genre: this.props.genre,
            author: this.props.author
        }
    }

}