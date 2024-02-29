import request from "supertest"
import HTTPAdapter from "../../../../src/adapters/HTTPAdapter/protocol"
import { Book, IBook } from "../../../../src/entities/Book";
import { IUser } from "../../../../src/entities/User";


describe('## GET BOOK TITLE ##', () => {

    let app: any;
    let id: string;
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

        // const adminBook: IUser = {
        //     username: "admin_teste",
        //     email: "admin_teste@gmail.com",
        //     password: "123",
        //     telephone: "43334458800"
        // }


        // const result =  await request(app)
        // .post('/v1/users/signIn')
        // .send(adminBook)
        // .expect(200)
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
        const tokenJSON= resultLogin.body;
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
    
    it("Deve buscar livro por titulo", async()=>{
       const result = await request.agent(app)
        .post(`/v1/book/title`)
        .send({
            title: Book1.title
        })
        .expect(200)
        const books = result.body
        for(let book of books) {
            expect(book).toHaveProperty("props.id")
            expect(book.props.title).toEqual(Book1.title)
        }
    })
})