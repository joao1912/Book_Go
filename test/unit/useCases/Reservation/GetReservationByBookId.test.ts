import { addBook } from "../../../../src/adapters/ormAdapter/protocols/bookProtocols";
import { createUser } from "../../../../src/adapters/ormAdapter/protocols/userProtocols"
import { IBook } from "../../../../src/entities/Book";
import { IUser, User } from "../../../../src/entities/User"


describe("Criando dados necessários para pegar a reserva de um livro por id", ()=>{

    let userOneId: string;
    let bookId: string
    beforeAll(async ()=>{

        const userOne: Omit<IUser, "id"> ={
            username: "Abelha",
            password: "4308",
            email: "abelha@",
            telephone: "3322224450"
        }

        const bookOne: Omit<IBook, "id"> = {
            title: "Book One",
            synopsis: "This is book one",
            price: 22,
            author: "Gem",
            genre: "Fantasia"
        }

        const newUser = await createUser.execute(userOne)
        const newBook = await addBook.execute(bookOne)

        userOneId = newUser.props.id
        bookId = newBook.props.id
    })

})