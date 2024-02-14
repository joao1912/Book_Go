import { addBook } from "../../../../src/adapters/ormAdapter/protocols/bookProtocols"
import { Book, IBook } from "../../../../src/entities/Book"
import { AddBookUseCase } from "../../../../src/usecases/book/AddBookUseCase"


describe("Adicionar um livro", ()=>{

    it("Criar um livro",async () => {
        
        const addingBook: IBook = {
            title: "New book to add",
            synopsis: "This is a new book",
            price: 20,
            author: "Jupiter",
            pageCount: 23,
            publishedDate: '1999-10-09',
            genre: "Biography"
        }
       
        
        const addBookUseCase = new AddBookUseCase(addBook)

        const result = await addBookUseCase.execute(addingBook)


        expect(result).toBeInstanceOf(Book)
    })

})