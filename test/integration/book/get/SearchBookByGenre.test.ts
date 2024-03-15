import request from "supertest"
import HTTPAdapter from "../../../../src/adapters/HTTPAdapter/protocol"
import { IBook } from "../../../../src/entities/Book";
import { IUser } from "../../../../src/entities/User";


describe('## POST BOOK GENRE ##', () => {

    let app: any;
    let id: string;
    let token: string;
    let genre: string = "Music"

    const Book1: IBook = {
        title: "Bob",
        synopsis: "Hey bob",
        price: 80,
        author: "Bob the bob",
        pageCount: 23,
        publishedDate: '2014-10-09',
        genre: "Music"
    }




    beforeAll(async () => {

        HTTPAdapter.config()
        app = HTTPAdapter.getApp()

        const adminBook: IUser = {
            username: "admin2book",
            email: "admin2book@gmail.com",
            password: "123",
            telephone: "5833458800"
        }


        const result = await request(app)
            .post('/v1/users/signIn')
            .send(adminBook)
            .expect(200)
        // const admin = result.body;
        // expect(admin).toHaveProperty('id');
        // id = admin.id;


        const resultLogin = await request.agent(app)
            .post("/v1/users/login")
            .send({
                email: "admin2book@gmail.com",
                password: "123"
            })
            .expect(200)
        const tokenJSON = resultLogin.body;
        expect(tokenJSON).toHaveProperty('token');
        token = tokenJSON.token;

        await request.agent(app)
            .post(`/v1/book/add`)
            .set('Authorization', `${token}`)
            .send(Book1)
            .expect(200)



    })

    afterAll(async () => {
        HTTPAdapter.close()

    })

    it("Deve buscar livro por genero", async () => {
        const result = await request.agent(app)
            .get(`/v1/book/genre/${genre}`)
            // .send({
            //     genre: "Music"
            // })
            .expect(200)
        const books = result.body
        for (let book of books) {
            expect(book).toHaveProperty("id")
        }
    })
    it("Deve tentar buscar um genero que não existe", async () => {
        const result = await request.agent(app)
            .get(`/v1/book/genre/blablabla`)
            // .send({
            //     genre: "blablabla"
            // })
            .expect(404)
        expect(result.body).toEqual(`No results.`)

    })
})