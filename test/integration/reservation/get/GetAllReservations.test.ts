import request from "supertest";
import HTTPAdapter from "../../../../src/adapters/HTTPAdapter/protocol";
import { IBook } from "../../../../src/entities/Book";
import { IUser } from "../../../../src/entities/User";

describe('## GET ##', () => {

    let app: any;
    let userId: string;
    let book_Id: string;
    let tokenUser: string;
    let tokenAdmin: string;

    beforeAll(async () => {

        HTTPAdapter.config()
        app = HTTPAdapter.getApp()

        const book: IBook = {
            title: "Eco Musical",
            synopsis: "Explore a sinfonia da natureza e da música nesta jornada harmoniosa, onde melodias se misturam com os sons da vida selvagem.",
            price: 20,
            author: "Coldplay",
            pageCount: 53,
            publishedDate: "2012-10-09",
            genre: "Music"
        }

        const user: IUser = {
            username: "getallreserve",
            email: "getallreserve@gmail.com",
            password: "Teste_123",
            telephone: "99642658800"
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
                email: "getallreserve@gmail.com",
                password: "Teste_123",
            })
            .expect(200)
            .then(response => {

                const tokenJSONUser = response.body;
                expect(tokenJSONUser).toHaveProperty('token');
                tokenUser = tokenJSONUser.token;

            })
        
        await request(app)
            .post(`/v1/reservation/user/${userId}/book/${book_Id}`)
            .set('Authorization', `${tokenUser}`)
            .expect(200)
            .then(response => {

                expect(response.body).toHaveProperty('id');

            })
       
    })

    it("Deve listar todas as reservas", async () => {

        await request(app)
            .get(`/v1/reservation/all`)
            .set('Authorization', `${tokenAdmin}`)
            .expect(200)
            .then(response => {

                expect(response.body[0]).toHaveProperty("id");

            })
       
    })

    it("Deve tentar ver todas as reservas sem token", async () => {

        await request(app)
            .get(`/v1/reservation/all`)
            .expect(401)
            .then(response => {

                expect(response.body).toEqual({ message: 'Must have an authorization token' })

            })

    })

    afterAll(async () => {

        HTTPAdapter.close()

    })

})