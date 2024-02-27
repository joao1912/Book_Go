import request from "supertest"
import HTTPAdapter from "../../../../src/adapters/HTTPAdapter/protocol"
import { IUser } from "@entities/User"
import { Book, IBook } from "@entities/Book";

describe('## POST BOOK ##', () => {

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
            password: "123",
            telephone: "4233458800"
        }


        const result =  await request(app)
        .post('/v1/users/signIn')
        .send(adminBook)
        .expect(200)
        const admin = result.body;
        expect(admin).toHaveProperty('id');
        id = admin.id;


   const resultLogin = await request.agent(app)
        .post("/v1/users/login")
        .send({
            email: "getAllbooks@gmail.com",
            password: "123"
        })
        .expect(200)
        const tokenJSON= resultLogin.body;
        expect(tokenJSON).toHaveProperty('token');
        token = tokenJSON.token;

        await request.agent(app)
        .post(`/v1/book/add`)
        .set('Authorization', `${token}`)
        .send(Book1)
        .expect(200)

         await request.agent(app)
        .post(`/v1/book/add`)
        .set('Authorization', `${token}`)
        .send(Book2)
        .expect(200)

     
    })

    afterAll(async () => {
        HTTPAdapter.close()

    })
    
    it("Deve buscar todos os livros", async()=>{
       const result = await request.agent(app)
        .get(`/v1/book/`)
        .expect(200)
        const books = result.body
        for(let book of books) {
            expect(book).toHaveProperty("props.id")
        }
    })
})