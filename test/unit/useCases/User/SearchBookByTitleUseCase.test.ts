import { addBook, deleteBook, searchBookByGenre, searchBookByTitle } from "../../../../src/adapters/ormAdapter/protocols/bookProtocols"
import { Book, IBook } from "../../../../src/entities/Book"
import { AddBookUseCase } from "../../../../src/usecases/book/AddBookUseCase"
import { DeleteBookUseCase } from "../../../../src/usecases/book/DeleteBookUseCase"
import { SearchBookByGenreUseCase } from "../../../../src/usecases/book/SearchBookByGenreUseCase"
import { SearchBookByTitleUseCase } from "../../../../src/usecases/book/SearchBookByTitleUseCase"


describe("Procurar  livros por titulo", ()=>{
        let BookToSearchTitle: string

    
    beforeAll(async ()=>{
        
        const BookGenreOne: Omit<IBook, "id"> ={
            title: "Search a title",
            synopsis: "This is a new book",
            price: 20,
            author: "Jupiter",
            genre: "Biography"
        }


        const bookDataOne = await addBook.execute(BookGenreOne)

        BookToSearchTitle = bookDataOne.props.title

    })

    it("Procurando livros por titulo",async () => {
        
      
        const searchBookByTitleUseCase = new SearchBookByTitleUseCase(searchBookByTitle)

        const result = await searchBookByTitleUseCase.execute(BookToSearchTitle)


        for (let prop of result){

            expect(prop).toBeInstanceOf(Book)
        }
      
})

it("Procurando um livro que não está registrado, deve retornar um erro",async () => {
        
      
    const searchBookByTitleUseCase = new SearchBookByTitleUseCase(searchBookByTitle)

    const result = await searchBookByTitleUseCase.execute("BookToSearchTitle")

    expect(result).toEqual([])
    expect(result).toHaveLength(0)
//     


  
})

})