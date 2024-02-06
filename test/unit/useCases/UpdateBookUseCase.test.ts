import { addBook, updateBook } from "../../../src/adapters/ormAdapter/protocols/bookProtocols"
import { Book, IBook } from "../../../src/entities/Book"
import { UpdateBookUseCase } from "../../../src/usecases/book/UpdateBookUseCase"


describe("Adicionar um livro", ()=>{
    let bookUpdateId: string
   
    beforeAll(async () => {
        
        const addingBook: Omit<IBook, "id"> ={
            title: "New book to edit",
            synopsis: "This is book is going to edited",
            price: 20,
            author: "Jupiter",
            genre: "Biography"
        }
        
       

        const newBook = await addBook.execute(addingBook)
        bookUpdateId = newBook.props.id

    })

    it("Deve editar um livro", async()=>{
        const bookEdit: Partial<IBook> = {
            id: bookUpdateId,
            price: 10,
            genre: "Test Edit"
        }

        const updateBookUseCase = new UpdateBookUseCase(updateBook)

        const result = await updateBookUseCase.execute(bookEdit)

        expect(result).toBeInstanceOf(Book)
    })

})