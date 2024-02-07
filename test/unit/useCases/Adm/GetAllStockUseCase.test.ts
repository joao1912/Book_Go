import { addBook } from "../../../../src/adapters/ormAdapter/protocols/bookProtocols"
import { getAllStock } from "../../../../src/adapters/ormAdapter/protocols/stockProtocols"
import { IBook } from "../../../../src/entities/Book"
import { Stock } from "../../../../src/entities/Stock"
import { GetAllStockUseCase } from "../../../../src/usecases/stock/GetAllStockUseCase"



describe("Test search all books on stock", ()=>{


    beforeAll(async ()=>{
        const oneBook: Omit <IBook, "id"> = {
            title: "Book Reserved",
            synopsis: "This book is going to be reserved",
            price: 999,
            genre: "Business",
            author: "John Bus"
        }
       
        
        const twoBook: Omit <IBook, "id"> = {
            title: "Book Reserved",
            synopsis: "This book is going to be reserved",
            price: 999,
            genre: "Business",
            author: "John Bus"
        }
        
        const bookOnStock1 = await addBook.execute(oneBook)
        const bookOnStock2 = await addBook.execute(twoBook)

    })

    it("Verificando stocks", async()=>{

        const getAllStockUseCase = new GetAllStockUseCase(getAllStock)

    const result = await getAllStockUseCase.execute()

    for (let prop of result){

      expect(prop).toBeInstanceOf(Stock)
  }



    })
})