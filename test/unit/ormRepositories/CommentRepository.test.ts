import { addBook } from "../../../src/adapters/ormAdapter/protocols/bookProtocols";
import { createComment, deleteComment, getAllComments, getAllCommentsByUserId, getCommentById, updateComment } from "../../../src/adapters/ormAdapter/protocols/commentProtocols";
import { createUser } from "../../../src/adapters/ormAdapter/protocols/userProtocols";
import { Book } from "../../../src/entities/Book";
import { Comment } from "../../../src/entities/Comment";
import { User } from "../../../src/entities/User";

interface ICommentToBeSearch {
    id?: string;
    comment: 'Um comentário para busca';
    bookId: string;
    userId: string;
}

interface ICommentToBeUpdate {
    id?: string;
    comment: 'Um comentário para atualizar';
    bookId: string;
    userId: string;
}

interface IUserToCommentTest { 
    id?: string;
    username: 'um nome2';
    email: 'teste@gmail.com2';
    telephone: '550000000002';
    password: 'senha_segura';
}

interface IBookToCommentTest { 
    id?: string
    title: 'Um livro de testes';
    author: 'Um author' 
    synopsis: 'bla bla bla';
    price: 15,
    pageCount: 123,
    publishedDate: '2003-10-09',
    genre: 'teste'; 
}



describe('Testes do CommentRepository', () => {

    let idCommentToBeDelete: string;
    let idCommentToBeSearch: string;
    let idCommentToBeUpdate: string;

    let bookId: string;
    let userId: string;

    beforeAll(async () => {

        // Criar um usuário para os testes

        const user: IUserToCommentTest = { 
            username: 'um nome2', 
            email: 'teste@gmail.com2', 
            telephone: '550000000002', 
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

        const book: IBookToCommentTest = {
            title: "Um livro de testes",
            author: "Um author",
            synopsis: "bla bla bla",
            price: 15,
            pageCount: 123,
            publishedDate: '2003-10-09',
            genre: "teste"
        }

        const bookInstance = new Book(book)

        await addBook.execute(bookInstance)
            .then(result => {

                const id = result.props.id

                if (id != undefined) {
                   bookId = id
                }

            })


        // Criar um comentário para deletar

        const commentInstanceToBeDelete = new Comment({
            comment: 'Um comentário',
            bookId: bookId,
            userId: userId
        })

        await createComment.execute(commentInstanceToBeDelete)
            .then(result => {
                const id = result.props.id

                if (id != undefined) {
                    idCommentToBeDelete = id
                }
            })


        // Criar comentário para buscas e update

        const commentToBeSearch = new Comment({
            comment: "Um comentário para busca",
            bookId: bookId,
            userId: userId
        })

        await createComment.execute(commentToBeSearch)
            .then(result => {
                const id = result.props.id

                if (id != undefined) {
                    idCommentToBeSearch = id
                }
            })

        // Criar comentário para buscas e update

        const dataToBeUpdate: ICommentToBeUpdate = {
            comment: "Um comentário para atualizar",
            bookId: bookId,
            userId: userId
        }

        const commentToBeUpdate = new Comment(dataToBeUpdate)

        await createComment.execute(commentToBeUpdate)
            .then(result => {
                const id = result.props.id

                if (id != undefined) {
                    idCommentToBeUpdate = id
                }
            })

    })

    it('Deve criar um comentário', async () => {

        const commentInstanceToBeCreate = new Comment({
            comment: 'Um comentário criado em testes!',
            bookId: bookId,
            userId: userId
        })
       
        await createComment.execute(commentInstanceToBeCreate)
            .then(result => {

                expect(result).toBeInstanceOf(Comment)
                expect(result.props).toHaveProperty('id')

            })

    })

    it('Deve deletar um comentário', async () => {
       
        await deleteComment.execute(idCommentToBeDelete)
            .then(result => {

                expect(result.message).toBe('Comentário deletado com sucesso!')
                expect(result).not.toBeInstanceOf(Comment)

            })

    })

    it('Deve buscar todos os comentários', async () => {
       
        await getAllComments.execute(bookId)
            .then(result => {

                expect(result.length).toBeGreaterThan(0)
                expect(result[0]).toBeInstanceOf(Comment)

            })

    })

    it('Deve buscar todos os comentários de um usuário', async () => {

        await getAllCommentsByUserId.execute(userId)
        .then(result => {

            expect(result.length).toBeGreaterThan(0)
            expect(result[0]).toBeInstanceOf(Comment)

        })

    })

    it('Deve buscar um comentário por id', async () => {
       
        await getCommentById.execute(idCommentToBeSearch)
            .then(result => {

                const equalValue: ICommentToBeSearch = {
                    id: idCommentToBeSearch,
                    comment: "Um comentário para busca",
                    bookId: bookId,
                    userId: userId
                }

                expect(result).toBeInstanceOf(Comment)
                expect(result?.props).toEqual(equalValue)

            })
    })

    it('Deve atulizar um comentário', async () => {
       
        const updatedValues = {
            id: idCommentToBeUpdate,
            comment: "Um comentário já atualizado",
            bookId: bookId,
            userId: userId
        }

        const commentInstanceToBeUpdated = new Comment(updatedValues)

        await updateComment.execute(commentInstanceToBeUpdated)
            .then(result => {

                expect(result).toBeInstanceOf(Comment)
                expect(result.props).toEqual(updatedValues)

            })
    })      

})