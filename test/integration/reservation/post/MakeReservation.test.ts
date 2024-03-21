import request from "supertest";
import HTTPAdapter from "../../../../src/adapters/HTTPAdapter/protocol";
import { IBook } from "../../../../src/entities/Book";
import { IUser } from "../../../../src/entities/User";

describe('## POST ##', () => {

    let app: any;
    let userId: string;
    let book_Id: string;
    let tokenUser: string;
    let tokenAdmin: string;

    beforeAll(async () => {

        HTTPAdapter.config()
        app = HTTPAdapter.getApp()

        const book: IBook = {
            title: "Cantos da Alma",
            synopsis: "Mergulhe nas profundezas da emoção humana através dessas canções que ecoam as experiências mais íntimas e os anseios mais profundos do coração.",
            price: 20,
            author: "Coldplay",
            pageCount: 53,
            publishedDate: "2012-10-09",
            genre: "Music"
        }

        const user: IUser = {
            username: "reserveonebook",
            email: "reserveonebook@gmail.com",
            password: "Teste_123",
            telephone: "9983327854"
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
                book_Id = bookProps.id;

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
                email: "reserveonebook@gmail.com",
                password: "Teste_123",
            })
            .expect(200)
            .then(response => {

                const tokenJSONUser = response.body;
                expect(tokenJSONUser).toHaveProperty('token');
                tokenUser = tokenJSONUser.token;

            })

    })

    it("Deve fazer uma reserva", async () => {

        await request(app)
            .post(`/v1/reservation/user/${userId}/book/${book_Id}`)
            .set('Authorization', `${tokenUser}`)
            .expect(200)
            .then(response => {

                expect(response.body).toHaveProperty('id');

            })
        
    })

    it("Deve fazer uma reserva com id inexistente", async () => {

        await request(app)
            .post(`/v1/reservation/user/${userId}/book/f47ac10b-58cc-4372-a567-0e02b2c3d479`)
            .set('Authorization', `${tokenUser}`)
            .expect(404)
            .then(response => {
               
                expect(response.body).toEqual({message: "Id provided does not exist."});

            })
        
    })

    it("Deve tentar fazer uma reserva sem token", async () => {

        await request(app)
            .post(`/v1/reservation/user/${userId}/book/${book_Id}`)
            .expect(401)
            .then(response => {

                expect(response.body).toEqual({message:'Must have an authorization token'});

            })
        
    })

    afterAll(async () => {

        HTTPAdapter.close()

    })

})