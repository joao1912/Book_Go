
import { GetStockByBookTitle } from "../../../../src/adapters/ormAdapter/prismaAdapter/stock/GetStockByBookTitle"
import { addBook } from "../../../../src/adapters/ormAdapter/protocols/bookProtocols"
import { getStockByBookTitle } from "../../../../src/adapters/ormAdapter/protocols/stockProtocols"
import { IBook } from "../../../../src/entities/Book"
import { Stock } from "../../../../src/entities/Stock"
import { GetAllStockUseCase } from "../../../../src/usecases/stock/GetAllStockUseCase"
import { GetStockByBookTitleUseCase } from "../../../../src/usecases/stock/GetStockByBookTitleUseCase"



describe("Test stock by book title", ()=>{

    let bookTitle: string
    beforeAll(async ()=>{
        const stockBookTitle: Omit <IBook, "id"> = {
            title: "Book Stock Titlee",
            synopsis: "This book is going to be reserved",
            price: 29,
            genre: "Business",
            author: "John Bus"
        }
       

        
        const bookOnStock1 = await addBook.execute(stockBookTitle)
        bookTitle = bookOnStock1.props.title

    })

    it("Verificando stocks", async()=>{

    const getStockByBookTitleUseCase = new GetStockByBookTitleUseCase(getStockByBookTitle)

    const result = await getStockByBookTitleUseCase.execute(bookTitle)

    for (let prop of result){

      expect(prop).toBeInstanceOf(Stock)
  }



    })
})