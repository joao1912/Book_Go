import { addBook } from "../../../src/adapters/ormAdapter/protocols/bookProtocols";
import { createComment } from "../../../src/adapters/ormAdapter/protocols/commentProtocols";
import { createUser } from "../../../src/adapters/ormAdapter/protocols/userProtocols";
import { IBook } from "../../../src/entities/Book";
import CleanDataBase from "../../util/CleanDataBase"

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
       


    })

    it('Deve buscar todos os comentários', async () => {
       


    })

    it('Deve buscar um comentário por id', async () => {
       


    })

    it('Deve atulizar um comentário', async () => {
       


    })

    afterAll(async () => {

        await CleanDataBase.execute()

    })

})