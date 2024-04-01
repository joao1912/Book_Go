import request from "supertest"
import HTTPAdapter from "../../../../src/adapters/HTTPAdapter/protocol"
import { IBook } from "../../../../src/entities/Book";
import { IUser } from "../../../../src/entities/User";

describe('## GET ##', () => {

    let app: any;
    let token: string;

    const Book1: IBook = {
        title: "O Tijolo",
        synopsis: "Usado nas construções",
        price: 80,
        author: "Pedro Pedreiro",
        pageCount: 23,
        publishedDate: '2014-10-09',
        genre: "Art"
    }

    beforeAll(async () => {

        HTTPAdapter.config()
        app = HTTPAdapter.getApp()

        const adminBook: IUser = {
            username: "admin_booktitle",
            email: "admin_booktitle@gmail.com",
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
                email: "admin_booktitle@gmail.com",
                password: "123.aB"
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

    it("Deve buscar livro por titulo", async () => {

        await request(app)
            .get(`/v1/book/title?title=${Book1.title}`)
            .expect(200)
            .then(response => {

                const books = response.body
                for (let book of books) {
                    expect(book).toHaveProperty("id")
                    expect(book.title).toEqual(Book1.title)
                }

            })
        
    })

    it("Deve tentar buscar um livro que não existe", async () => {

        await request(app)
            .get(`/v1/book/title?title=auishaiuhdsaiu`)
            .expect(404)
            .then(response => {

                expect(response.body).toEqual({message: `No results.`})
            
            })
    })

    afterAll(async () => {
        
        HTTPAdapter.close()

    })

})