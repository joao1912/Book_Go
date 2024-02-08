
import { GetStockByBookTitle } from "../../../../src/adapters/ormAdapter/prismaAdapter/stock/GetStockByBookTitle"
import { addBook } from "../../../../src/adapters/ormAdapter/protocols/bookProtocols"
import { getStockByBookTitle, getStockByQuantity } from "../../../../src/adapters/ormAdapter/protocols/stockProtocols"
import { Book, IBook } from "../../../../src/entities/Book"
import { Stock } from "../../../../src/entities/Stock"
import { GetAllStockUseCase } from "../../../../src/usecases/stock/GetAllStockUseCase"
import { GetStockByBookTitleUseCase } from "../../../../src/usecases/stock/GetStockByBookTitleUseCase"
import { GetStockByQuantityUseCase } from "../../../../src/usecases/stock/GetStockByQuantityUseCase"



describe("Test stock by book title", ()=>{

    let bookQuantity: number
    beforeAll(async ()=>{
        const stockBookQuantity = new Book({
            title: "Book Stock Titlee",
            synopsis: "This book is going to be reserved",
            price: 29,
            genre: "Business",
            author: "John Bus"
        })
       

        
        const bookOnStock1 = await addBook.execute(stockBookQuantity)
        bookQuantity = 1

    })

    it("Verificando stocks", async()=>{

    const getStockByQuantityUseCase = new GetStockByQuantityUseCase(getStockByQuantity)

    const result = await getStockByQuantityUseCase.execute(bookQuantity)

    for (let prop of result){

      expect(prop).toBeInstanceOf(Stock)
  }



    })
})