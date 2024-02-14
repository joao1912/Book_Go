import { addBook, getAllBooks } from "../../../../src/adapters/ormAdapter/protocols/bookProtocols"
import { Book, IBook } from "../../../../src/entities/Book"
import { GetAllBooksUseCase } from "../../../../src/usecases/book/GetAllBooksUseCase"


describe("Test search all books", ()=>{


    beforeAll(async ()=>{
        const oneBook = new Book ({
            title: "Bookie all test",
            synopsis: "HUM...",
            price: 999,
            genre: "News",
            pageCount: 23,
            publishedDate: '1999-10-09',
            author: "Diego"
        })
       
         
        const bookOnStock1 = await addBook.execute(oneBook)

    })

    it("Procurando todos os livros", async()=>{

    const getAllBooksUseCase = new GetAllBooksUseCase(getAllBooks)

    const result = await getAllBooksUseCase.execute()

    for (let prop of result){

      expect(prop).toBeInstanceOf(Book)
  }



    })
})