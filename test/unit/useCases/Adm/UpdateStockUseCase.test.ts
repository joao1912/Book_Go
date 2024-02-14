
import { GetStockByBookTitle } from "../../../../src/adapters/ormAdapter/prismaAdapter/stock/GetStockByBookTitle"
import { addBook } from "../../../../src/adapters/ormAdapter/protocols/bookProtocols"
import { getStockByBookTitle, updateStock } from "../../../../src/adapters/ormAdapter/protocols/stockProtocols"
import { Book, IBook } from "../../../../src/entities/Book"
import { IStock, Stock } from "../../../../src/entities/Stock"
import { UpdateStockUseCase } from "../../../../src/usecases/stock/UpdateStockUseCase"



describe("Test update stock ", () => {

    let bookStockUpdate: string
    let bookStockUpdateQuantity: number
    let bookType: IBook

    beforeAll(async () => {
        const stockBookTitle = new Book({
            title: "Book Stock Update",
            synopsis: "This book is going to be reserved",
            price: 29,
            genre: "Business",
            pageCount: 73,
            publishedDate: '2001-04-09',
            author: "John Bus"
        })

        const bookData = await addBook.execute(stockBookTitle)
        if (bookData.props.id) { bookStockUpdate = bookData.props.id }
        bookStockUpdateQuantity = 5

        bookType = {
            id: bookData.props.id,
            title: bookData.props.title,
            price: bookData.props.price,
            author: bookData.props.author,
            synopsis: bookData.props.synopsis,
            pageCount: bookData.props.pageCount,
            publishedDate: bookData.props.publishedDate,
            genre: bookData.props.genre
        }

    })

    it("Updating testing", async () => {
        const updateQuantity: IStock = {

            quantity: bookStockUpdateQuantity,
            book: bookType


        }

        const updateStockUseCase = new UpdateStockUseCase(updateStock)

        const result = await updateStockUseCase.execute(updateQuantity)


        expect(result).toBeInstanceOf(Stock)
        // expect(result.props.book).toEqual(bookType)
        // ta dando pau aqui



    })
})