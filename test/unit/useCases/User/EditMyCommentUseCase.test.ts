import { addBook } from "../../../../src/adapters/ormAdapter/protocols/bookProtocols"
import { createComment, updateComment } from "../../../../src/adapters/ormAdapter/protocols/commentProtocols"
import { createUser } from "../../../../src/adapters/ormAdapter/protocols/userProtocols"
import { Book } from "../../../../src/entities/Book"
import { User } from "../../../../src/entities/User"
import { Comment } from "../../../../src/entities/Comment"
import { EditMyCommentUseCase } from "../../../../src/usecases/comment/EditMyCommentUseCase"


describe('Teste do EditMyCommentUseCase', () => {

    let userId: string;
    let bookId: string;
    let commentId: string;

    beforeAll(async () => {

        // Criar um livro

        const bookData = new Book({
            title: 'O livro muito bom',
            author: 'O autor muito bom',
            genre: 'incrivel',
            price: 10,
            synopsis: 'estranhamente barato'
        })

        await addBook.execute(bookData)
            .then(result => {

                const id = result.props.id

                if (id != undefined) {

                    bookId = id

                }

            })

        // Criar um user

        const userData = new User({
            email: 'umUserMuitoDiferente@teste.com',
            password: 'senha789545',
            telephone: '1010101010',
            username: 'um nome muito bom ai',
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
            comment: 'olha que livro louco!'
        })

        await createComment.execute(commentData1)
            .then(result => {

                const id = result.props.id

                if (id != undefined) {

                    commentId = id

                }

            })
    })

    it('Deve editar um comentário por id', async () => {

        const editMyCommentUseCase = new EditMyCommentUseCase(updateComment)

        const updateValues = new Comment({
            userId: userId,
            bookId: bookId,
            comment: 'O comentário mudou!',
            id: commentId
        })

        await editMyCommentUseCase.execute(updateValues)
            .then(result => {

                expect(result).toBeInstanceOf(Comment)
                expect(result.props).toEqual(updateValues.props)

            })

    })

})