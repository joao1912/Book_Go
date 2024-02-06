import { addBook } from "../../../src/adapters/ormAdapter/protocols/bookProtocols";
import { createFinance } from "../../../src/adapters/ormAdapter/protocols/financeProtocols"
import { createUser } from "../../../src/adapters/ormAdapter/protocols/userProtocols";
import { typeOfPayment } from "../../../src/adapters/ormAdapter/repositories/finance/ICreateFinance";
import { Finance } from "../../../src/entities/Finance";

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

        

    })

    it('Deve buscar todos os dados no finance', async () => {

        

    })

    it('Deve buscar um dado no finance por id', async () => {

        

    })

    it('Deve atualizar informações de um dado no finance', async () => {

        
    })


    afterAll(() => {



    })

})