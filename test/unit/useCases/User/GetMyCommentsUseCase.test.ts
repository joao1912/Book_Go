import { addBook } from "../../../../src/adapters/ormAdapter/protocols/bookProtocols";
import { createComment, getAllCommentsByUserId } from "../../../../src/adapters/ormAdapter/protocols/commentProtocols";
import { createUser } from "../../../../src/adapters/ormAdapter/protocols/userProtocols"
import { Book, IBook } from "../../../../src/entities/Book";
import { Comment, IComment } from "../../../../src/entities/Comment";
import { IUser, User } from "../../../../src/entities/User"
import { GetMyCommentsUseCase } from "../../../../src/usecases/comment/GetMyCommentsUseCase";


describe('Teste de caso de uso do GetMyComments', () => {

    let userId: string;

    let commentId1: string;
    let commentId2: string;

    beforeAll(async () => {

        const user: IUser = {
            username: "O cleitin dos testes",
            password: "umaSenhaSegura123",
            email: "emailParaTeste@teste.com",
            telephone: "1233312233"
        }

        const userInstance = new User(user)

        await createUser.execute(userInstance)
            .then(result => {

                const id = result.props.id

                if (id != undefined) {
                    userId = id
                }

            })


        const book1: IBook = {
            title: "Um title para testes1",
            author: "teste",
            synopsis: "blaha",
            price: 0,
            genre: "teste",
            pageCount: 26,
            publishedDate: '2011-04-09',
        }

        const book2: IBook = {
            title: "Um title para testes2",
            author: "teste",
            synopsis: "blaha",
            price: 0,
            genre: "teste",
            pageCount: 73,
            publishedDate: '2001-04-09',
        }

        const bookInstace1 = await addBook.execute(new Book(book1))
        const bookInstace2 = await addBook.execute(new Book(book2))

        const idBook1 = bookInstace1.props.id
        const idBook2 = bookInstace2.props.id

        if (idBook1 != undefined && idBook2 != undefined) {

            const comment1: IComment = {
                bookId: idBook1,
                userId: userId,
                comment: "Um comentário louco1"
            }

            const comment2: IComment = {
                bookId: idBook2,
                userId: userId,
                comment: "Um comentário louco2"
            }

            const commentInstance1 = new Comment(comment1)
            const commentInstance2 = new Comment(comment2)

            await createComment.execute(commentInstance1)
                .then(result => {

                    const id = result.props.id

                    if (id != undefined) {
                        commentId1 = id
                    }

                })


            await createComment.execute(commentInstance2)
                .then(result => {

                    const id = result.props.id

                    if (id != undefined) {
                        commentId2 = id
                    }

                })
        }
    })

    it('Deve buscar todos os comentários de um usuário', async () => {

        const getMyComments = new GetMyCommentsUseCase(getAllCommentsByUserId)

        await getMyComments.execute(userId)
            .then(result => {

                expect(result.length).toBeGreaterThan(0)
                expect(result[0]).toBeInstanceOf(Comment)

            })

    })

})