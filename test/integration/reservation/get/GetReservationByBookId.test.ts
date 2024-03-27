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
            title: "Ritmo da Vida",
            synopsis: "Sinta a pulsação da vida nesta vibrante coleção de canções que celebram a jornada humana com ritmos envolventes e letras inspiradoras.",
            price: 20,
            author: "Coldplay",
            pageCount: 53,
            publishedDate: "2012-10-09",
            genre: "Music"
        }

        const user: IUser = {
            username: "getabookreserve",
            email: "getbookreserve@gmail.com",
            password: "Teste_123",
            telephone: "135062658800"
        }

        const adminBook: IUser = {
            username: "admin_reservationbook",
            email: "admin_reservationubook@gmail.com",
            password: "123.aB",
            telephone: "5833346800"
        } 

        await request(app)
            .post('/v1/users/signIn')
            .send(adminBook)
            .expect(200) 
            

        await request(app)
            .post("/v1/users/login")
            .send({
                email: "admin_reservationubook@gmail.com",
                password: "123.aB",
            })
            .expect(200)
            .then(response => {

                const tokenJSON = response.body;
                expect(tokenJSON).toHaveProperty('token');
                tokenAdmin = tokenJSON.token;

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
                email: "getbookreserve@gmail.com",
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

    it("Deve listar todas as reservas de um livro", async () => {

        await request(app)
            .get(`/v1/reservation/book/${bookId}`)
            .set('Authorization', `${tokenUser}`)
            .expect(200)
            .then(response => {

                expect(response.body[0]).toHaveProperty("id");

            })
        
    })
    it("Deve tentar ver a reserva de um livro com id não existente", async () => {

        await request(app)
            .get(`/v1/reservation/book/8suad9d8as98sad`)
            .set('Authorization', `${tokenUser}`)
            .expect(400)
            // .then(response => {

            //     console.log(response.body)
            //     expect(response.body.message.message).toEqual("Invalid ID provided.");

            // })
        
    })
    it("Deve tentar ver todas as reservas sem token", async () => {

        await request(app)
            .get(`/v1/reservation/book/${bookId}`)
            .expect(401)
            .then(response => {
                expect(response.body).toEqual({ message: 'Must have an authorization token' })
          

            })
        
    })

    afterAll(async () => {

        HTTPAdapter.close()

    })

})