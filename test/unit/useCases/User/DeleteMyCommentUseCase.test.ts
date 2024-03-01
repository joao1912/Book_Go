import { addBook } from "../../../../src/adapters/ormAdapter/protocols/bookProtocols";
import { createComment, deleteComment } from "../../../../src/adapters/ormAdapter/protocols/commentProtocols";
import { createUser } from "../../../../src/adapters/ormAdapter/protocols/userProtocols";
import { Book } from "../../../../src/entities/Book";
import { User } from "../../../../src/entities/User";
import { Comment } from "../../../../src/entities/Comment";
import { DeleteMyCommentUseCase } from "../../../../src/usecases/comment/DeleteMyCommentUseCase";


describe('Teste do DeleteMyCommentUseCase', () => {

    let commentId: string;
    let userId: string;
    let bookId: string;

    beforeAll(async () => {

        // Criar um livro

        const bookData = new Book({
            title: 'O livro muito diferente né',
            author: 'O autor muito diferente',
            genre: 'diferente',
            price: 30,
            synopsis: 'estranhamente diferente',
            pageCount: 73,
            publishedDate: '2001-04-09',
        })

        await addBook.execute(bookData)
            .then(result => {
                if(result instanceof Book){

                    const id = result.props.id
    
                    if (id != undefined) {
    
                        bookId = id
    
                    }
                }

            })

        // Criar um user

        const userData = new User({
            email: 'umUserMuitoMUITODiferente@teste.com',
            password: 'senha37889545',
            telephone: '2020202020',
            username: 'um nome muito bom ai né',
        })

        await createUser.execute(userData)
            .then(result => {

                const id = result.props.id

                if (id != undefined) {

                    userId = id

                }

            })

        // Criar os comentários

        const commentData1 = new Comment({
            bookId: bookId,
            userId: userId,
            comment: 'olha que livro diferente!'
        })

        await createComment.execute(commentData1)
            .then(result => {

                const id = result.props.id

                if (id != undefined) {

                    commentId = id

                }

            })

    })

    it('Deve deletar um comentário por id', async () => {

        const deleteMyCommentUseCase = new DeleteMyCommentUseCase(deleteComment)

        await deleteMyCommentUseCase.execute(commentId)
            .then(result => {

                expect(result.message).toBe('Comentário deletado com sucesso!')

            })

    })

})