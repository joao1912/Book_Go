import { httpClientAdapter } from "../../../src/adapters/httpClientAdapter/protocol"
import { addBook } from "../../../src/adapters/ormAdapter/protocols/bookProtocols"
import { IBook, Book } from "../../../src/entities/Book"
import ApiBookGoogle from "../../../src/external/ApiBookGoogle"
import { AddBookUseCase } from "../../../src/usecases/book/AddBookUseCase"


describe("Adicionar um livro da GoogleApi", ()=>{

    it("Deve adicionar um livro da GoogleApi",async () => {
        
        const apiBookGoogle = new ApiBookGoogle(httpClientAdapter)

        const book = await apiBookGoogle.findBook('Harry Potter')

        const data: IBook[] = book      
        
        const addBookUseCase = new AddBookUseCase(addBook)

        const result = await addBookUseCase.execute(data[0])


        expect(result).toBeInstanceOf(Book)
    }, 20000)

    it("Deve adicionar mais de um livro da GoogleApi",async () => {
        
        const apiBookGoogle = new ApiBookGoogle(httpClientAdapter)

        const book = await apiBookGoogle.findBook('Harry Potter')

        const data: IBook[] = book      
        
        const addBookUseCase = new AddBookUseCase(addBook)

        for (let i = 0; i < 2; i++) {
            const result = await addBookUseCase.execute(data[i])
            expect(result).toBeInstanceOf(Book)
            
        }


    }, 20000)

})