import { ZodType, z } from "zod"


export interface IComment {
    id?: string;
    bookId: string;
    userId: string;
    comment: string;
}

export const commentSchema = z.object({
    id: z.string().optional(),
    bookId: z.string(),
    userId: z.string(),
    comment: z.string().min(6, { message: 'A descrição precisa de no minimo 6 caracteres.' }),
}) satisfies ZodType<IComment>

export class Comment {

    readonly props: IComment

    constructor(props: IComment) {

        const { id, bookId, userId, comment } = props;

        this.props = props
    }

}