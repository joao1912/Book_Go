import request from "supertest"
import HTTPAdapter from "../../../../src/adapters/HTTPAdapter/protocol"
import { Book, IBook } from "../../../../src/entities/Book";
import { IUser } from "../../../../src/entities/User";


describe('## GET BOOK TITLE ##', () => {

    let app: any;
    let bookId: string;
    let token: string;
       
    const Book1: IBook = {
        title: "O Livro do Update",
        synopsis: "Usado nas construções",
        price: 80,
        author: "Pedro Cascau",
        pageCount: 23,
        publishedDate: '2014-10-09',
        genre: "Art"
    }
  


   
    beforeAll(async () => {

        HTTPAdapter.config()
        app = HTTPAdapter.getApp()


   const resultLogin = await request(app)
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
        const book = resultBook.body;
        expect(book).toHaveProperty('id');
        bookId = book.id;


     
    })

    afterAll(async () => {
        HTTPAdapter.close()

    })
    
    it("Deve mudar o titulo do livro", async()=>{
       const result = await request.agent(app)
        .put(`/v1/book/update/${bookId}`)
        .set('Authorization', `${token}`)
        .send({
            title: "1..2..3"
        })
        .expect(200)
        const bookEdited = result.body
        expect(bookEdited).toHaveProperty("id")
        
    })
    it("Deve mudar a sinopse do livro", async()=>{
        const result = await request.agent(app)
        .put(`/v1/book/update/${bookId}`)
        .set('Authorization', `${token}`)
        .send({
            synopsis: "Hello Stranger"
        })
        .expect(200)
        const bookEdited = result.body
        expect(bookEdited).toHaveProperty("id")
        
    })
    
    it("Deve mudar o genero do livro", async()=>{
       const result = await request.agent(app)
        .put(`/v1/book/update/${bookId}`)
        .set('Authorization', `${token}`)
        .send({
            genre: "Try"
        })
        .expect(200)
        const bookEdited = result.body
        expect(bookEdited).toHaveProperty("id")
        
    })


    it("Deve mudar titulo com int, deve receber mensagem", async()=>{
       const result = await request.agent(app)
        .put(`/v1/book/update/${bookId}`)
        .set('Authorization', `${token}`)
        .send({
            title: 403        
        })
        .expect(400)
        const bookEdited = result.body
        expect(bookEdited).toEqual(`Invalid input type.`)
        
    })
    
})