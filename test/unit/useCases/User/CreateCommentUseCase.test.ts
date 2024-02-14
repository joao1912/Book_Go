import { addBook } from "../../../../src/adapters/ormAdapter/protocols/bookProtocols";
import { createComment } from "../../../../src/adapters/ormAdapter/protocols/commentProtocols"
import { createUser } from "../../../../src/adapters/ormAdapter/protocols/userProtocols";
import { Book } from "../../../../src/entities/Book";
import { Comment, IComment } from "../../../../src/entities/Comment"
import { User } from "../../../../src/entities/User";
import { CreateCommentUseCase } from "../../../../src/usecases/comment/CreateCommentUseCase";


describe('Teste do CreateCommentUseCase', () => {

    let bookId: string;
    let userId: string;

    beforeAll(async () => {

        // Criar um usuário para os testes

        const user = {
            username: 'um nome para CreateCommentUseCase',
            email: 'teste@gmail.com para CreateCommentUseCase',
            telephone: '550000005892',
            password: 'senha_segura'
        }

        const userInstance = new User(user)

        await createUser.execute(userInstance)
            .then(result => {

                const id = result.props.id

                if (id != undefined) {
                    userId = id
                }

            })

        // Crir um livro para os testes

        const book = {
            title: "Um livro de testes para CreateCommentUseCase",
            author: "Um author",
            synopsis: "bla bla bla",
            price: 15,
            genre: "teste",
            pageCount: 703,
            publishedDate: '2009-04-09',
        }

        const bookInstance = new Book(book)

        await addBook.execute(bookInstance)
            .then(result => {

                const id = result.props.id

                if (id != undefined) {
                    bookId = id
                }

            })

    })

    it('Deve criar um comentário', async () => {

        const createCommentUseCase = new CreateCommentUseCase(createComment)

        const commentData: IComment = {
            bookId: bookId,
            userId: userId,
            comment: "Olha que livro bacana"
        }

        await createCommentUseCase.execute(commentData)
            .then(result => {

                expect(result).toBeInstanceOf(Comment)
                expect(result.props).toHaveProperty('id')

            })

    })

})