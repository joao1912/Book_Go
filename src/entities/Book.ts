
import { z, ZodType } from "zod";

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
    id: z.string().uuid().optional(),
    title: z.string()
        .min(1, { message: "The title must be at least 1 character long." })
        .max(50, { message: "The title must be a maximum of 50 characters in length.'." }),

    author: z.string()
        .min(3, { message: 'The author name must be at least 3 character long.' })
        .max(40, { message: "The author name must be a maximum of 40 characters in length." }),
   
    synopsis: z.string()
        .min(20, { message: "The synopsis must be at least 20 characters long." })
        .max(200, { message: "The synopsis must be at most 200 characters long." }),
    price: z.number(),
    genre: z.string()
    .min(3, { message: "The genre must be at least 3 characters long." })
    .max(25, { message: "The genre must be a maximum of 35 characters in length." }),
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