import HTTPAdapter from "../../../../src/adapters/HTTPAdapter/protocol";
import { authAdapter } from "../../../../src/adapters/authAdapter/protocol";
import { createFinance } from "../../../../src/adapters/ormAdapter/protocols/financeProtocols";
import { typeOfPayment } from "../../../../src/adapters/ormAdapter/repositories/finance/ICreateFinance";
import { IBook } from "../../../../src/entities/Book";
import { Finance } from "../../../../src/entities/Finance";
import { IUser } from "../../../../src/entities/User";
import request from "supertest";

describe('## GET ##', () => {

    let token: string;
    let app: any;
    let bookId: string;
    let userId: string;

    const addingBook: IBook = {
        title: "Melodias do Coração",
        synopsis: "Adentre o universo musical dessas composições envolventes, onde cada nota ressoa com as emoções mais profundas e verdadeiras.",
        price: 20,
        author: "Coldplay",
        pageCount: 53,
        publishedDate: "2012-10-09",
        genre: "Music"
    }

    beforeAll(async () => {

        token = authAdapter.sign('id_teste1', 18000)

        HTTPAdapter.config()
        app = HTTPAdapter.getApp()

        const user: IUser = {
            username: "Um User do finance",
            password: "umaSenhaLouca_123",
            email: "userDoFinance123@gmail.com",
            telephone: "48958043853"
        }

        await request(app)
            .post('/v1/users/signIn')
            .send(user)
            .expect(200)
            .then(response => {
               
                userId = response.body.user.id

            })

        await request(app)
            .post(`/v1/book/add`)
            .set('Authorization', `${token}`)
            .send(addingBook)
            .expect(200)
            .then(response => {

                bookId = response.body.id

            })


        // criar dados no finance

        const financeInstance1 = new Finance({
            payment: typeOfPayment.Pix,
            bookId: bookId,
            userId: userId,
            total: 15
        })

        await createFinance.execute(financeInstance1)

        const financeInstance2 = new Finance({
            payment: typeOfPayment.Pix,
            bookId: bookId,
            userId: userId,
            total: 15
        })

        await createFinance.execute(financeInstance2)


        const financeInstance3 = new Finance({
            payment: typeOfPayment.Pix,
            bookId: bookId,
            userId: userId,
            total: 18
        })

        await createFinance.execute(financeInstance3)

    })

    it('Deve retornar todo o finance', async () => {

        await request(app)
            .get('/v1/finance/')
            .set('Authorization', token)
            .expect(200)
            .then(response => {

                expect(response.body.length).toBeGreaterThan(1)

            })

    })

})