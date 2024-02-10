import { addBook } from "../../../src/adapters/ormAdapter/protocols/bookProtocols";
import { updateStock, getAllStock, getStockByQuantity, getStockByBookTitle } from "../../../src/adapters/ormAdapter/protocols/stockProtocols"
import { Book, IBook } from "../../../src/entities/Book";
import { IStock, Stock } from "../../../src/entities/Stock"



describe('Testes do StockRepository', () => {


    let stockSearchByTitle: string
    let bookId1: string
    let bookId2: string
    let stockSearchByQuantity: number
    let IBookType: IBook
    let IBookTypeSearch: IBook


    beforeAll(async () => {

        // Criar um livro buscar o estoque

        const book1: IBook = ({
            title: "ORM Stock to search",
            synopsis: "This is a test to search a Stock just with orm",
            price: 1,
            genre: "Test ORM",
            author: "Wilson",
        })
        const bookInstance1 = new Book(book1)

        await addBook.execute(bookInstance1)
            .then(result => {

                if (result.props.title) (stockSearchByTitle = result.props.title)
                if (result.props.id) (bookId1 = result.props.id)
            
           
                IBookType = {
                    id: result.props.id,
                    title: result.props.title,
                    price: result.props.price,
                    author: result.props.author,
                    synopsis: result.props.synopsis,
                    genre: result.props.genre
                }

            })


        // Criar um  livro para atualizar a quantidade

        const book2: IBook = ({
            title: "ORM Stock to search",
            synopsis: "This is a test to search a Stock just with orm",
            price: 1,
            genre: "Test ORM",
            author: "Wilson",
        })

        const bookInstance2 = new Book(book2)

        await addBook.execute(bookInstance2)
            .then(result => {
                if (result.props.id) (bookId2 = result.props.id)

                IBookTypeSearch = {
                    id: result.props.id,
                    title: result.props.title,
                    price: result.props.price,
                    author: result.props.author,
                    synopsis: result.props.synopsis,
                    genre: result.props.genre
                }

            })

        // Atualizando estoque
        const updateQuantityBefore = new Stock({

            quantity: 20,
            book: IBookTypeSearch
        })


        await updateStock.execute(updateQuantityBefore).then(result => {

            stockSearchByQuantity = result.props.quantity
        })


    })

    it('Deve buscar um stock por quantidade', async () => {

        const result = await getStockByQuantity.execute(stockSearchByQuantity)

        for (let stock of result) {

            expect(stock).toBeInstanceOf(Stock)
        }

    })


    it('Deve buscar um stock pelo titulo do livro', async () => {

        const result = await getStockByBookTitle.execute(stockSearchByTitle)

        for (let stock of result) {
            expect(stock.props.book.title).toEqual("ORM Stock to search")
            expect(stock).toBeInstanceOf(Stock)
        }

    })


    it("Atualizar a quantidade do livro", async () => {
        const updateQuantity: IStock = {

            quantity: 50,
            book: IBookType


        }

        const stockInstanceUpdate = new Stock(updateQuantity)
        const result = await updateStock.execute(stockInstanceUpdate)


        expect(result).toBeInstanceOf(Stock)




    })


    it('Deve buscar todos os stocks', async () => {

        const allStocks = await getAllStock.execute()

        expect(allStocks.length).toBeGreaterThan(0)

        for (let bookStock of allStocks) expect(bookStock).toBeInstanceOf(Stock)
    })
})