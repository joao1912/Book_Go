
import { addBook } from "../../../../src/adapters/ormAdapter/protocols/bookProtocols"
import { getStockByQuantity } from "../../../../src/adapters/ormAdapter/protocols/stockProtocols"
import { Book } from "../../../../src/entities/Book"
import { Stock } from "../../../../src/entities/Stock"
import { GetStockByQuantityUseCase } from "../../../../src/usecases/stock/GetStockByQuantityUseCase"



describe("Test stock by book title", ()=>{

    let bookQuantity: number
    beforeAll(async ()=>{
        const stockBookQuantity = new Book({
            title: "Book Stock Titlee",
            synopsis: "This book is going to be reserved",
            price: 29,
            genre: "Business",
            pageCount: 75,
            publishedDate: '2002-04-09',
            author: "John Bus"
        })
       

        
        const bookOnStock1 = await addBook.execute(stockBookQuantity)
        bookQuantity = 1

    })

    it("Procurando stocks por quantidade", async()=>{

    const getStockByQuantityUseCase = new GetStockByQuantityUseCase(getStockByQuantity)

    const result = await getStockByQuantityUseCase.execute(bookQuantity)

    if(result instanceof Stock && Array.isArray(result))
    for (let prop of result){

      expect(prop).toBeInstanceOf(Stock)
  }



    })
})