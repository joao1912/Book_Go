export interface IComment {
    userId: number;
    bookId: number;
    comment: string;
}

export class Comment {

    readonly id: string;
    readonly userId: number;
    readonly bookId: number;
    readonly comment: string;

    constructor(id: string, userId: number, bookId: number, comment: string) {
        this.id = id
        this.bookId = bookId;
        this.userId = userId;
        this.comment = comment;
    }

    getId() {
        return this.id
    }

    getBookId() {
        return this.bookId
    }

    getUserId() {
        return this.userId
    }

    getComment() {
        return this.comment
    }

}