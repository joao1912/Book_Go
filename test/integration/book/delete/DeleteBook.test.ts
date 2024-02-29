import request from "supertest"
import HTTPAdapter from "../../../../src/adapters/HTTPAdapter/protocol"
import { Book, IBook } from "../../../../src/entities/Book";
import { IUser } from "../../../../src/entities/User";


describe('## DELETE BOOK  ##', () => {

    let app: any;
    let token: string;
    let id: string
       
    const Book1: IBook = {
        title: "Adeus",
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

       const resultBook = await request.agent(app)
        .post(`/v1/book/add`)
        .set('Authorization', `${token}`)
        .send(Book1)
        .expect(200)
        const book = resultBook.body
        expect(book).toHaveProperty("id")
        id = book.id


     
    })

    afterAll(async () => {
        HTTPAdapter.close()

    })
    
    it("Deve buscar livro por titulo", async()=>{
       const result = await request.agent(app)
       .delete(`/v1/book/${id}`)
        .expect(200)
      
        expect(result.body).toEqual({message: `The book with ID ${id} and title "${Book1.title}" has been successfully deleted.`
    })
    })
})