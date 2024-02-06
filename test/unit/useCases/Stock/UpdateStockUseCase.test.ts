
import { GetStockByBookTitle } from "../../../../src/adapters/ormAdapter/prismaAdapter/stock/GetStockByBookTitle"
import { addBook } from "../../../../src/adapters/ormAdapter/protocols/bookProtocols"
import { getStockByBookTitle, updateStock } from "../../../../src/adapters/ormAdapter/protocols/stockProtocols"
import { IBook } from "../../../../src/entities/Book"
import { IStock, Stock } from "../../../../src/entities/Stock"
import { GetAllStockUseCase } from "../../../../src/usecases/stock/GetAllStockUseCase"
import { GetStockByBookTitleUseCase } from "../../../../src/usecases/stock/GetStockByBookTitleUseCase"
import { UpdateStockUseCase } from "../../../../src/usecases/stock/UpdateStockUseCase"



describe("Test update stock ", ()=>{

    let bookStockUpdate: string
    let bookStockUpdateQuantity: number
    beforeAll(async ()=>{
        const stockBookTitle: Omit <IBook, "id"> = {
            title: "Book Stock Update",
            synopsis: "This book is going to be reserved",
            price: 29,
            genre: "Business",
            author: "John Bus"
        }
       

        
        const bookOnStock1 = await addBook.execute(stockBookTitle)
        bookStockUpdate = bookOnStock1.props.id
        bookStockUpdateQuantity = 5
        
        

    })

    it("Updating testing", async()=>{
        const updateQuantity: Partial<IStock> ={
            id: bookStockUpdate,
            quantity: bookStockUpdateQuantity
        }

    const updateStockUseCase = new UpdateStockUseCase(updateStock)

    const result = await updateStockUseCase.execute(updateQuantity)


      expect(result).toBeInstanceOf(Stock)
  



    })
})