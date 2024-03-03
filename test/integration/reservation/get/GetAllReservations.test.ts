import request from "supertest";
import HTTPAdapter from "../../../../src/adapters/HTTPAdapter/protocol";
import { IBook } from "../../../../src/entities/Book";
import { IUser } from "../../../../src/entities/User";

describe('## GET ALL RESERVATION ##', () => {

    let app: any;
    let userId: string;
    let book_Id: string;
    let reservationId: string;
    let tokenUser: string;
    let tokenAdmin: string;

   
    beforeAll(async () => {

        HTTPAdapter.config()
        app = HTTPAdapter.getApp()
        const book: IBook = {
            title: "Route get all reserve",
            synopsis: "Um copo meio cheio",
            price: 80,
            author: "Route Get",
            pageCount: 23,
            publishedDate: '2024-10-09',
            genre: "Route"
        }
        const user: IUser = {
            username: "getallreserve",
            email: "getallreserve@gmail.com",
            password: "123",
            telephone: "99642658800"
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
                email: "getallreserve@gmail.com",
                password: "123",
            })
            .expect(200)
        const tokenJSONUser = loginUser.body;
        expect(tokenJSONUser).toHaveProperty('token');
        tokenUser = tokenJSONUser.token;

        const resultReserve = await request.agent(app)
        .post(`/v1/reservation/user/${userId}/book/${book_Id}`)
        .set('Authorization', `${tokenUser}`)
        .expect(200)
        expect(resultReserve.body).toHaveProperty('id');
        reservationId = resultReserve.body.id

    })

    afterAll(async () => {
        HTTPAdapter.close()

    })

    
    it("Deve listar todas as reservas", async ()=>{
        const result = await request.agent(app)
        .get(`/v1/reservation/all`)
        .set('Authorization', `${tokenAdmin}`)
        .expect(200)
        expect(result.body[0]).toHaveProperty("id");
    })

    it("Deve tentar ver todas as reservas sem token", async ()=>{
        const result = await request.agent(app)
        .get(`/v1/reservation/all`)
        .expect(401)
    })


  

  

})