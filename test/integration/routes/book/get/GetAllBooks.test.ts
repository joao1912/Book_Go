import request from "supertest"
import HTTPAdapter from "../../../../src/adapters/HTTPAdapter/protocol"
import { IBook } from "../../../../src/entities/Book";
import { IUser } from "../../../../src/entities/User";


describe('## GET ##', () => {

    let app: any;
    let id: string;
    let token: string;

    const Book1: IBook = {
        title: "Arabella",
        synopsis: "When shen needs shelter from",
        price: 80,
        author: "Artic Monkeys",
        pageCount: 23,
        publishedDate: '2014-10-09',
        genre: "Music"
    }

    const Book2: IBook = {
        title: "A História",
        synopsis: "A história da estória",
        price: 80,
        author: "Nobody",
        pageCount: 23,
        publishedDate: '1912-10-09',
        genre: "History"
    }

    beforeAll(async () => {

        HTTPAdapter.config()
        app = HTTPAdapter.getApp()

        const adminBook: IUser = {
            username: "getmeAllBooks",
            email: "getAllbooks@gmail.com",
            password: "123.aB",
            telephone: "4233458800"
        }

        await request(app)
            .post('/v1/users/signIn')
            .send(adminBook)
            .expect(200)
            .then(response => {

                const admin = response.body;
                expect(admin.user).toHaveProperty('id');
                id = admin.user.id;

            })

        await request(app)
            .post("/v1/users/login")
            .send({
                email: "getAllbooks@gmail.com",
                password: "123.aB",
            })
            .expect(200)
            .then(response => {

                const tokenJSON = response.body;
                expect(tokenJSON).toHaveProperty('token');
                token = tokenJSON.token;

            })

        await request(app)
            .post(`/v1/book/add`)
            .set('Authorization', `${token}`)
            .send(Book1)
            .expect(200)

        await request(app)
            .post(`/v1/book/add`)
            .set('Authorization', `${token}`)
            .send(Book2)
            .expect(200)

    })

    it("Deve buscar todos os livros", async () => {

        await request(app)
            .get(`/v1/book/`)
            .expect(200)
            .then(response => {

                const books = response.body

                expect(books.length).toBeGreaterThan(0)
                for (let book of books) {
                    expect(book).toHaveProperty('id')
                }

            })

    })

    afterAll(async () => {
        
        HTTPAdapter.close()

    })
    
})