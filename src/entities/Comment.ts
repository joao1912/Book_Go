import { ZodType, z } from "zod"


export interface IComment {
    id?: string;
    bookId: string;
    userId: string;
    comment: string;
}

export const commentSchema = z.object({
    id: z.string().uuid().optional(),
    bookId: z.string().uuid(),
    userId: z.string().uuid(),
    comment: z.string()
    .min(3, { message: "Comments must be at least 3 characters long." })
    .max(200, { message: "Comments must be a maximum of 35 characters in length." }),
}) satisfies ZodType<IComment>

export class Comment {

    readonly props: IComment

    constructor(props: IComment) {

        const { id, bookId, userId, comment } = props;

        this.props = props
    }

}