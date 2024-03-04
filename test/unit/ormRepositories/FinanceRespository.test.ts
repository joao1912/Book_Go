import { addBook } from "../../../src/adapters/ormAdapter/protocols/bookProtocols";
import { createFinance, deleteFinance, getAllFinances, getFinanceById, updateFinance } from "../../../src/adapters/ormAdapter/protocols/financeProtocols"
import { createUser } from "../../../src/adapters/ormAdapter/protocols/userProtocols";
import { typeOfPayment } from "../../../src/adapters/ormAdapter/repositories/finance/ICreateFinance";
import { Book } from "../../../src/entities/Book";
import { Finance, IFinance } from "../../../src/entities/Finance";
import { User } from "../../../src/entities/User";

interface IUserToFinanceTest {
    id?: string;
    username: 'um nome';
    email: 'teste@gmail.com';
    telephone: '55000000000';
    password: 'senha_segura';
}

interface IBookToFinanceTest {
    id?: string
    title: 'Um livro de testes';
    author: 'Um author'
    synopsis: 'bla bla bla';
    price: 15
    pageCount: 123,
     publishedDate: '2003-10-09'
    genre: 'teste';
}

describe('Testes do FinanceRepository', () => {

    let userId: string;
    let bookId: string;
    let idFinanceToBeDelete: string;
    let idFinanceToBeSearch: string;
    let idFinanceToBeUpdated: string;

    beforeAll(async () => {

        // Criar um usuário para os testes

        const user: IUserToFinanceTest = {
            username: 'um nome',
            email: 'teste@gmail.com',
            telephone: '55000000000',
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

        const book: IBookToFinanceTest = {
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

                if (typeof result != 'string') {

                    const id = result.props.id

                    if (id != undefined) {
                        bookId = id
                    }
                    
                }

                

            })

        // Criar um finance para o delete

        const financeInstance = new Finance({
            payment: typeOfPayment.Pix,
            bookId: bookId,
            userId: userId,
            total: 15
        })

        await createFinance.execute(financeInstance)
            .then(result => {

                const id = result.props.id

                if (id != undefined) {

                    idFinanceToBeDelete = id

                }


            })

        // Criar um finance para os testes de busca

        const financeInstanceToBeSearch = new Finance({
            payment: typeOfPayment.Pix,
            bookId: bookId,
            userId: userId,
            total: 15
        })

        await createFinance.execute(financeInstanceToBeSearch)
            .then(result => {

                const id = result.props.id

                if (id != undefined) {

                    idFinanceToBeSearch = id

                }

            })

        // Criar um finance para o update

        const financeInstanceToBeUpdate = new Finance({
            payment: typeOfPayment.Pix,
            bookId: bookId,
            userId: userId,
            total: 18
        })

        await createFinance.execute(financeInstanceToBeUpdate)
            .then(result => {

                const id = result.props.id

                if (id != undefined) {

                    idFinanceToBeUpdated = id

                }

            })


    })


    it('Deve criar um dado no finance', async () => {

        const financeInstaceToBeCreated = new Finance({
            payment: typeOfPayment.Pix,
            bookId: bookId,
            userId: userId,
            total: 15
        })

        await createFinance.execute(financeInstaceToBeCreated)
            .then(result => {

                expect(result).toBeInstanceOf(Finance)
                expect(result.props).toHaveProperty('id')

            })

    })

    it('Deve deletar um dado no finance', async () => {

        await deleteFinance.execute(idFinanceToBeDelete)
            .then(result => {

                expect(result.message).toBe('Deletado com sucesso!')
                expect(result).not.toBeInstanceOf(Finance)

            })

    })

    it('Deve buscar todos os dados no finance', async () => {

        await getAllFinances.execute()
            .then(result => {

                expect(result.length).toBeGreaterThan(0)
                expect(result[0]).not.toBeInstanceOf(Finance)

            })

    })

    it('Deve buscar um dado no finance por id', async () => {

        await getFinanceById.execute(idFinanceToBeSearch)
            .then(result => {

                expect(result.props).toEqual({
                    id: idFinanceToBeSearch,
                    payment: typeOfPayment.Pix,
                    bookId: bookId,
                    userId: userId,
                    total: 15
                })
                expect(result).toBeInstanceOf(Finance)

            })

    })

    it('Deve atualizar informações de um dado no finance', async () => {

        const newDataFinance = {
            id: idFinanceToBeUpdated,
            payment: typeOfPayment.Pix,
            total: 10
        }

        const financeInstaceToBeUpdate = new Finance({
            id: idFinanceToBeUpdated,
            payment: typeOfPayment.Pix,
            total: 10,
            bookId: bookId,
            userId: userId
        })

        await updateFinance.execute(financeInstaceToBeUpdate)
            .then(result => {

                expect(result).toBeInstanceOf(Finance)
                expect(result.props?.total).toBe(newDataFinance.total)
                expect(result.props?.id).toBe(newDataFinance.id)

            })

    })

})