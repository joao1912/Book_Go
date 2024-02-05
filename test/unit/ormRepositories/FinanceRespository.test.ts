import { addBook } from "../../../src/adapters/ormAdapter/protocols/bookProtocols";
import { createFinance, deleteFinance, getAllFinances, getFinanceById, updateFinance } from "../../../src/adapters/ormAdapter/protocols/financeProtocols"
import { createUser } from "../../../src/adapters/ormAdapter/protocols/userProtocols";
import { typeOfPayment } from "../../../src/adapters/ormAdapter/repositories/finance/ICreateFinance";
import { Finance, IFinance } from "../../../src/entities/Finance";

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

        await createUser.execute(user)
            .then(result => {

                userId = result.props.id

            })

        // Crir um livro para os testes

        const book: IBookToFinanceTest = {
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

        // Criar um finance para o delete

        await createFinance.execute({
            payment: typeOfPayment.Pix,
            bookId: bookId,
            userId: userId,
            total: 15
        })
            .then(result => {

                idFinanceToBeDelete = result.props.id

            })

        // Criar um finance para os testes de busca

        await createFinance.execute({
            payment: typeOfPayment.Pix,
            bookId: bookId,
            userId: userId,
            total: 15
        })
            .then(result => {

                idFinanceToBeSearch = result.props.id

            })

        // Criar um finance para o update

        await createFinance.execute({
            payment: typeOfPayment.Pix,
            bookId: bookId,
            userId: userId,
            total: 18
        })
            .then(result => {

                idFinanceToBeUpdated = result.props.id

            })


    })


    it('Deve criar um dado no finance', async () => {

        await createFinance.execute({
            payment: typeOfPayment.Pix,
            bookId: bookId,
            userId: userId,
            total: 15
        })
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

        await updateFinance.execute(newDataFinance)
            .then(result => {

                expect(result).toBeInstanceOf(Finance)
                expect(result.props?.total).toBe(newDataFinance.total)
                expect(result.props?.id).toBe(newDataFinance.id)

            })

    })

})