import { addBook } from "../../../../src/adapters/ormAdapter/protocols/bookProtocols"
import { Book, IBook } from "../../../../src/entities/Book"
import { AddBookUseCase } from "../../../../src/usecases/book/AddBookUseCase"


describe("Adicionar um livro", ()=>{

    it("Criar um livro",async () => {
        const jsonAuthor = ("Jupiter, Author 2")
        const jsonGenre = ("Biography, Genre2")
        const addingBook: IBook = {
            title: "New book to add",
            synopsis: "This is a new bookkk",
            price: 20,
            author: jsonAuthor,
            pageCount: 23,
            publishedDate: '1999-10-09',
            genre: jsonGenre
        }
       
        
        const addBookUseCase = new AddBookUseCase(addBook)

        const result = await addBookUseCase.execute(addingBook)


        expect(result).toBeInstanceOf(Book)
    })

})