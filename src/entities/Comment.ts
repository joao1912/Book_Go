export interface IComment {
    id?: string;
    bookId: string;
    userId: string;
    comment: string;
}

export class Comment {

    readonly props: IComment

    constructor(props: IComment) {
        
        const { id, bookId, userId, comment } = props;

        this.props = props
    }

}