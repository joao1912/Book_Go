import request from "supertest"
import HTTPAdapter from "../../../../src/adapters/HTTPAdapter/protocol"
import { IBook } from "../../../../src/entities/Book";
import { IUser } from "../../../../src/entities/User";


describe('## POST BOOK ##', () => {

    let app: any;
    let id: string;
    let token: string;

    const addingBook: IBook = {
        title: "A Route too add book",
        synopsis: "I just got lost",
        price: 80,
        author: "Coldplay",
        pageCount: 23,
        publishedDate: '2012-10-09',
        genre: "Music"
    }

    beforeAll(async () => {

        HTTPAdapter.config()
        app = HTTPAdapter.getApp()

        const adminBook: IUser = {
            username: "adminBookPost",
            email: "adminBookPost@gmail.com",
            password: "123",
            telephone: "4233458800"
        }


        // const result = await request.agent(app)
        //     .post('/v1/users/signIn')
        //     .send(adminBook)
        //     .expect(200)
        // const admin = result.body;
        // expect(admin).toHaveProperty('id');
        // id = admin.id;


        const resultLogin = await request.agent(app)
            .post("/v1/users/login")
            .send({
                email: "admin_teste@gmail.com",
                password: "123"
            })
            .expect(200)
        const tokenJSON = resultLogin.body;
        expect(tokenJSON).toHaveProperty('token');
        token = tokenJSON.token;

    },25000)

    afterAll(async () => {
        HTTPAdapter.close()

    })

    it("Deve adicionar um livro", async () => {
        const result = await request.agent(app)
            .post(`/v1/book/add`)
            .set('Authorization', `${token}`)
            .send(addingBook)
            .expect(200)
        const book = result.body
        expect(book).toHaveProperty("id")
       
    },25000)
})