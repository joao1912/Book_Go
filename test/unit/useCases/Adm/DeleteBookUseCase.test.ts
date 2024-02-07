import { addBook, deleteBook } from "../../../../src/adapters/ormAdapter/protocols/bookProtocols"
import { Book, IBook } from "../../../../src/entities/Book"
import { AddBookUseCase } from "../../../../src/usecases/book/AddBookUseCase"
import { DeleteBookUseCase } from "../../../../src/usecases/book/DeleteBookUseCase"


describe("Deletar um livro", ()=>{
        let BookToDeleteId: string
        let BookToDeleteTitle: string
    
    beforeAll(async ()=>{
        
        const BookToDelete: Omit<IBook, "id"> ={
            title: "New book to add",
            synopsis: "This is a new book",
            price: 20,
            author: "Jupiter",
            genre: "Biography"
        }

        const bookData = await addBook.execute(BookToDelete)
        BookToDeleteId = bookData.props.id
        BookToDeleteTitle = bookData.props.title

    })

    it("Deletar um livro",async () => {
        
      
        const deleteBookUseCase = new DeleteBookUseCase(deleteBook)

        const result = await deleteBookUseCase.execute(BookToDeleteId)


        expect(result).toStrictEqual({
            message: `O livro de id: ${BookToDeleteId} e ${BookToDeleteTitle} foi excluído com sucesso.`
    })
})

})