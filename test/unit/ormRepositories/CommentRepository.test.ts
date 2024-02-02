import { addBook } from "../../../src/adapters/ormAdapter/protocols/bookProtocols";
import { createComment, deleteComment, getAllComments, getCommentById, updateComment } from "../../../src/adapters/ormAdapter/protocols/commentProtocols";
import { createUser } from "../../../src/adapters/ormAdapter/protocols/userProtocols";
import CleanDataBase from "../../util/CleanDataBase"
import { Comment } from "../../../src/entities/Comment";

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
    username: 'um nome';
    email: 'teste@gmail.com';
    telephone: '55000000000';
    password: 'senha_segura';
}

interface IBookToCommentTest { 
    id?: string
    title: 'Um livro de testes';
    author: 'Um author' 
    synopsis: 'bla bla bla';
    price: 15
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
            username: 'um nome', 
            email: 'teste@gmail.com', 
            telephone: '55000000000', 
            password: 'senha_segura' 
        }

        await createUser.execute(user)
            .then(result => {

                userId = result.props.id

            })

        // Crir um livro para os testes

        const book: IBookToCommentTest = {
            title: "Um livro de testes",
            author: "Um author",
            synopsis: "bla bla bla",
            price: 15,
            genre: "teste"
        }

        await addBook.execute(book)
            .then(result => {

                bookId = result.props.id

            })


        // Criar um comentário para deletar

        await createComment.execute({
            comment: 'Um comentário',
            bookId: bookId,
            userId: userId
        })
            .then(result => {
                idCommentToBeDelete = result.props.id
            })


        // Criar comentário para buscas e update

        const commentToBeSearch: ICommentToBeSearch = {
            comment: "Um comentário para busca",
            bookId: bookId,
            userId: userId
        }

        await createComment.execute(commentToBeSearch)
            .then(result => {
                idCommentToBeSearch = result.props.id
            })

        // Criar comentário para buscas e update

        const commentToBeUpdate: ICommentToBeUpdate = {
            comment: "Um comentário para atualizar",
            bookId: bookId,
            userId: userId
        }

        await createComment.execute(commentToBeUpdate)
            .then(result => {
                idCommentToBeUpdate = result.props.id
            })

    })

    it('Deve criar um comentário', async () => {
       
        await createComment.execute({
            comment: 'Um comentário criado em testes!',
            bookId: bookId,
            userId: userId
        })
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

        await updateComment.execute(updatedValues)
            .then(result => {

                expect(result).toBeInstanceOf(Comment)
                expect(result.props).toEqual(updatedValues)

            })

    })

    afterAll(async () => {

        await CleanDataBase.execute()

    })

})