import { addBook, deleteBook } from "../../../../src/adapters/ormAdapter/protocols/bookProtocols"
import { Book, IBook } from "../../../../src/entities/Book"
import { AddBookUseCase } from "../../../../src/usecases/book/AddBookUseCase"
import { DeleteBookUseCase } from "../../../../src/usecases/book/DeleteBookUseCase"


describe("Deletar um livro", ()=>{
        let BookToDeleteId: string
        let BookToDeleteTitle: string
    
    beforeAll(async ()=>{
        
        const BookToDelete= new Book ({
            title: "New book to add",
            synopsis: "This is a new book",
            price: 20,
            author: "Jupiter",
            pageCount: 23,
            publishedDate: '1999-10-09',
            genre: "Biography"
        })

        const bookData = await addBook.execute(BookToDelete)
        if(bookData.props.id){BookToDeleteId = bookData.props.id }
        if(bookData.props.title){BookToDeleteTitle = bookData.props.title }

    })

    it("Deletar um livro",async () => {
        
      
        const deleteBookUseCase = new DeleteBookUseCase(deleteBook)

        const result = await deleteBookUseCase.execute(BookToDeleteId)


        expect(result).toStrictEqual({
            message: `The book with ID ${BookToDeleteId} and title "${BookToDeleteTitle}" has been successfully deleted.`
    })
})

})