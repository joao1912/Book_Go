import request from "supertest"
import HTTPAdapter from "../../../../src/adapters/HTTPAdapter/protocol"
import { IBook } from "../../../../src/entities/Book";
import { IUser } from "../../../../src/entities/User";


describe('## POST ##', () => {

    let app: any;
    let token: string;
    let genre: string = "Music"

    const Book1: IBook = {
        title: "As aventuras do pequeno bob",
        synopsis: "Cuidado, o bob é bem impaciente, adora pregar peças em seus colegas!",
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
            password: "123.aB",
            telephone: "5833458800"
        }

        await request(app)
            .post('/v1/users/signIn')
            .send(adminBook)
            .expect(200)

        await request(app)
            .post("/v1/users/login")
            .send({
                email: "admin2book@gmail.com",
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

    })

    it("Deve buscar livro por genero", async () => {

        await request(app)
            .get(`/v1/book/genre/${genre}`)
            .expect(200)
            .then(response => {

                const books = response.body
                for (let book of books) {
                    expect(book).toHaveProperty("id")
                }

            })
        
    })

    it("Deve tentar buscar um genero que não existe", async () => {

        await request(app)
            .get(`/v1/book/genre/blablabla`)
            .expect(404)
            .then(response => {

                expect(response.body).toEqual({ message: `The genre of this book was not found.` })

            })

    })

    afterAll(async () => {
        
        HTTPAdapter.close()

    })

})