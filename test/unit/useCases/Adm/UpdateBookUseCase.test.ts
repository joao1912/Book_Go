import { addBook, updateBook } from "../../../../src/adapters/ormAdapter/protocols/bookProtocols"
import { Book, IBook } from "../../../../src/entities/Book"
import { UpdateBookUseCase } from "../../../../src/usecases/book/UpdateBookUseCase"


describe("Adicionar um livro", ()=>{
    let bookUpdateId: string
    let bookData: IBook
   
    beforeAll(async () => {
        
        const addingBook = new Book ({
            title: "New book to edit",
            synopsis: "This is book is going to edited",
            price: 20,
            author: "Jupiter",
            genre: "Biography"
        })
        
       

        const newBook = await addBook.execute(addingBook)
        if(newBook.props.id){bookUpdateId = newBook.props.id}

        bookData = {
        id: newBook.props.id,
        title: newBook.props.title,
        price: newBook.props.price,
        author: newBook.props.author,
        synopsis: newBook.props.synopsis,
        genre: newBook.props.genre
    }

    })

    it("Deve editar um livro", async()=>{
        const bookEdit: IBook = {
                id: bookUpdateId,
                price: 10,
                genre: "Test Edit",
                author: bookData.author,
                synopsis: bookData.synopsis,
                title: bookData.title
            
        }

        const updateBookUseCase = new UpdateBookUseCase(updateBook)

        const result = await updateBookUseCase.execute(bookEdit)

        expect(result).toBeInstanceOf(Book)
    })

})