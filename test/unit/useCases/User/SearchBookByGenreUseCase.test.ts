import { addBook, deleteBook, searchBookByGenre } from "../../../../src/adapters/ormAdapter/protocols/bookProtocols"
import { Book, IBook } from "../../../../src/entities/Book"
import { AddBookUseCase } from "../../../../src/usecases/book/AddBookUseCase"
import { DeleteBookUseCase } from "../../../../src/usecases/book/DeleteBookUseCase"
import { SearchBookByGenreUseCase } from "../../../../src/usecases/book/SearchBookByGenreUseCase"


describe("Procurar um livros por genero", ()=>{
        let BookToSearchGenre: string

    
    beforeAll(async ()=>{
        
        const BookGenreOne = new Book({
            title: "Search a genre",
            synopsis: "This is a new book",
            price: 20,
            author: "Jupiter",
            genre: "Biography",
            pageCount: 73,
            publishedDate: '2001-04-09',
        })
        const BookGenreTwo = new Book({
            title: "Search a genre two",
            synopsis: "This is a new book",
            price: 20,
            author: "Jupiter",
            genre: "Biography",
            pageCount: 73,
            publishedDate: '2001-04-09',
        })

        const bookDataOne = await addBook.execute(BookGenreOne)
        const bookDataTwo = await addBook.execute(BookGenreTwo)

        BookToSearchGenre = bookDataOne.props.genre

    })

    it("Procurando livros",async () => {
        
      
        const searchBookByGenreUseCase = new SearchBookByGenreUseCase(searchBookByGenre)

        const result = await searchBookByGenreUseCase.execute(BookToSearchGenre)


        for (let prop of result){

            expect(prop).toBeInstanceOf(Book)
        }
      
})

// it("Deve retornar um erro",async () => {
        
      
//     const searchBookByGenreUseCase = new SearchBookByGenreUseCase(searchBookByGenre)

//     const result = await searchBookByGenreUseCase.execute(BookToSearchGenre)


//     for (let prop of result){

//         expect(prop).toBeInstanceOf(Book)
//     }
  
// })

})