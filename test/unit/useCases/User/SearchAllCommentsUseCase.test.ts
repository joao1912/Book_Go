import { addBook } from "../../../../src/adapters/ormAdapter/protocols/bookProtocols"
import { createComment, getAllComments } from "../../../../src/adapters/ormAdapter/protocols/commentProtocols";
import { createUser } from "../../../../src/adapters/ormAdapter/protocols/userProtocols";
import { Book } from "../../../../src/entities/Book"
import { Comment } from "../../../../src/entities/Comment";
import { User } from "../../../../src/entities/User";
import { SearchAllCommentsUseCase } from "../../../../src/usecases/comment/SearchAllCommentsUseCase";


describe('Testes do SearchAllCommentsUseCase', () => {

    let bookId: string;
    let userId: string;
    let userIdAlternative: string;
    let commentAlternative: Comment;

    beforeAll(async () => {

        // Criar um livro

        const bookData = new Book({
            title: 'O livro estranho',
            author: 'O autor estranho',
            genre: 'estranho',
            price: 50,
            synopsis: 'estranhamente caro',
            pageCount: 73,
            publishedDate: '2001-04-09',
        })

        await addBook.execute(bookData)
            .then(result => {
                if (result instanceof Book){
                    const id = result.props.id
                 
                    if (id != undefined) {

                        bookId = id
                }



                }

            })

        // Criar um user

        const userData = new User({
            email: 'umUser@teste.com',
            password: 'senha123545',
            telephone: '9090909090',
            username: 'um nome estranho ai',
        })

        await createUser.execute(userData)
            .then(result => {

                const id = result.props.id

                if (id != undefined) {

                    userId = id

                }

            })

        const userDataAlternative = new User({
            email: 'umUserAlternative@teste.com',
            password: 'senha127775',
            telephone: '6060606060',
            username: 'um nome estranho ai, diferente',
        })

        await createUser.execute(userDataAlternative)
            .then(result => {

                const id = result.props.id

                if (id != undefined) {

                userIdAlternative = id

                }

            })

        // Criar os comentários

        const commentData1 = new Comment({
            bookId: bookId,
            userId: userId,
            comment: 'olha que livro legal!'
        })

        const commentData2 = new Comment({
            bookId: bookId,
            userId: userId,
            comment: 'olha que livro estranho!'
        })

        const commentData3 = new Comment({
            bookId: bookId,
            userId: userIdAlternative,
            comment: 'Eu sou outro user em!'
        })


        await createComment.execute(commentData1)


        await createComment.execute(commentData2)


        await createComment.execute(commentData3)
            .then(result => {

                commentAlternative = result

            })


    })

    it('Deve buscar todos os comentários de um livro', async () => {

        const getAllCommentsUseCase = new SearchAllCommentsUseCase(getAllComments)

        await getAllCommentsUseCase.execute(bookId)
            .then(comments => {

                expect(comments[0]).toBeInstanceOf(Comment)
                expect(comments[1]).toBeInstanceOf(Comment)
                expect(comments.length).toBeGreaterThan(1)

            })
    })
})