import request from "supertest";
import HTTPAdapter from "../../../../src/adapters/HTTPAdapter/protocol";
import { IBook } from "../../../../src/entities/Book";
import { IUser } from "../../../../src/entities/User";

describe('## POST RESERVATION ##', () => {

    let app: any;
    let userId: string;
    let book_Id: string;
    let tokenUser: string;
    let tokenAdmin: string;

   
    beforeAll(async () => {

        HTTPAdapter.config()
        app = HTTPAdapter.getApp()
        const book: IBook = {
            title: "Route to reserve a book",
            synopsis: "When shen needs shelter from",
            price: 80,
            author: "Route Reserve",
            pageCount: 23,
            publishedDate: '2014-10-09',
            genre: "Route"
        }
        const user: IUser = {
            username: "reserveonebook",
            email: "reserveonebook@gmail.com",
            password: "123",
            telephone: "4555658800"
        }

        const loginAdmin = await request.agent(app)
            .post("/v1/users/login")
            .send({
                email: "admin_teste@gmail.com",
                password: "123",
            })
            .expect(200)
        const tokenJSONAdmin = loginAdmin.body;
        expect(tokenJSONAdmin).toHaveProperty('token');
        tokenAdmin = tokenJSONAdmin.token;


       const resultBook = await request.agent(app)
            .post(`/v1/book/add`)
            .set('Authorization', `${tokenAdmin}`)
            .send(book)
            .expect(200)
            const bookProps = resultBook.body;
            expect(bookProps).toHaveProperty('id');
            book_Id = bookProps.id;
    

        const result = await request(app)
            .post('/v1/users/signIn')
            .send(user)
            .expect(200)

        const userSignIn = result.body;
        expect(userSignIn).toHaveProperty('id');
        userId = userSignIn.id;


        const loginUser = await request.agent(app)
            .post("/v1/users/login")
            .send({
                email: "reserveonebook@gmail.com",
                password: "123",
            })
            .expect(200)
        const tokenJSONUser = loginUser.body;
        expect(tokenJSONUser).toHaveProperty('token');
        tokenUser = tokenJSONUser.token;

    })

    afterAll(async () => {
        HTTPAdapter.close()

    })

    it("Deve fazer uma reserva", async ()=>{
        const result = await request.agent(app)
        .post(`/v1/reservation/user/${userId}`)
        .set('Authorization', `${tokenUser}`)
        .send({
            bookId: book_Id
        })
        .expect(200)
        expect(result.body).toHaveProperty('id');
    })

    it("Deve fazer uma reserva com id inexistente", async ()=>{
        const result = await request.agent(app)
        .post(`/v1/reservation/user/${userId}`)
        .set('Authorization', `${tokenUser}`)
        .send({
            bookId: "esseidnãoexiste"
        })
        .expect(404)
        expect(result.body).toEqual('Id provided does not exist.');
    })

    it("Deve tentar fazer uma reserva sem token", async ()=>{
        const result = await request.agent(app)
        .post(`/v1/reservation/user/${userId}`)
        .send({
            bookId: book_Id
        })
        .expect(401)
        console.log(result.body)
        expect(result.body.message).toEqual('Must have an authorization token' );
    })

})