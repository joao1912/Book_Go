import request from "supertest";
import HTTPAdapter from "../../../../src/adapters/HTTPAdapter/protocol";
import { IBook } from "../../../../src/entities/Book";
import { IUser } from "../../../../src/entities/User";

describe('## GET ##', () => {

    let app: any;
    let userId: string;
    let bookId: string;
    let tokenUser: string;
    let tokenAdmin: string;

    beforeAll(async () => {

        HTTPAdapter.config()
        app = HTTPAdapter.getApp()

        const book: IBook = {
            title: "Melodias do Infinito",
            synopsis: "Explore as profundezas do universo através dessas melodias cósmicas, cada nota uma jornada para além dos limites da compreensão humana.",
            price: 20,
            author: "Coldplay",
            pageCount: 53,
            publishedDate: "2012-10-09",
            genre: "Music"
        }

        const user: IUser = {
            username: "getuserreserve",
            email: "getauserreserve@gmail.com",
            password: "Teste_123",
            telephone: "98340244567"
        }

        await request(app)
            .post("/v1/users/login")
            .send({
                email: "admin_teste@gmail.com",
                password: "123.aB",
            })
            .expect(200)
            .then(response => {

                const tokenJSONAdmin = response.body;
                expect(tokenJSONAdmin).toHaveProperty('token');
                tokenAdmin = tokenJSONAdmin.token;

            })

        await request(app)
            .post(`/v1/book/add`)
            .set('Authorization', `${tokenAdmin}`)
            .send(book)
            .expect(200)
            .then(response => {

                const bookProps = response.body;
                expect(bookProps).toHaveProperty('id');
                bookId = bookProps.id;

            })

        await request(app)
            .post('/v1/users/signIn')
            .send(user)
            .expect(200)
            .then(response => {

                const userSignIn = response.body;
                expect(userSignIn.user).toHaveProperty('id');
                userId = userSignIn.user.id;

            })
        
       await request(app)
            .post("/v1/users/login")
            .send({
                email: "getauserreserve@gmail.com",
                password: "Teste_123",
            })
            .expect(200)
            .then(response => {

                const tokenJSONUser = response.body;
                expect(tokenJSONUser).toHaveProperty('token');
                tokenUser = tokenJSONUser.token;

            })
        
        await request(app)
            .post(`/v1/reservation/user/${userId}/book/${bookId}`)
            .set('Authorization', `${tokenUser}`)
            .expect(200)
            .then(response => {

                expect(response.body).toHaveProperty('id');

            })
    
    })

    it("Deve listar todas as reservas de um usuario", async () => {

        await request(app)
            .get(`/v1/reservation/user/${userId}`)
            .set('Authorization', `${tokenUser}`)
            .expect(200)
            .then(response => {

                expect(response.body[0]).toHaveProperty("id");

            })
       
    })

    afterAll(async () => {

        HTTPAdapter.close()

    })

})