import { addBook, searchBookByTitle } from "../../../../src/adapters/ormAdapter/protocols/bookProtocols"
import { Book } from "../../../../src/entities/Book"
import { SearchBookByTitleUseCase } from "../../../../src/usecases/book/SearchBookByTitleUseCase"


describe("Procurar  livros por titulo", () => {
    let BookToSearchTitle: string


    beforeAll(async () => {

        const BookGenreOne = new Book({
            title: "Search a title",
            synopsis: "This is a new book",
            price: 20,
            author: "Jupiter",
            genre: "Biography",
            pageCount: 73,
            publishedDate: '2001-04-09',
        })


        const bookDataOne = await addBook.execute(BookGenreOne)

        if (bookDataOne instanceof Book)
            BookToSearchTitle = bookDataOne.props.title

    })

    it("Procurando livros por titulo", async () => {


        const searchBookByTitleUseCase = new SearchBookByTitleUseCase(searchBookByTitle)

        const result = await searchBookByTitleUseCase.execute(BookToSearchTitle)


        for (let prop of result) {

            expect(prop).toBeInstanceOf(Book)
        }

    }, 10000)

    it("Procurando um livro que não está registrado, deve retornar um erro", async () => {


        const searchBookByTitleUseCase = new SearchBookByTitleUseCase(searchBookByTitle)

        const result = await searchBookByTitleUseCase.execute("NãoEstáRegistrado")

        expect(result).toEqual("No results.")
        //     



    })

})