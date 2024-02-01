import { MakeReservation } from "../../src/adapters/ormAdapter/prismaAdapter/reservation/MakeReservation"
import { addBook } from "../../src/adapters/ormAdapter/protocols/bookProtocols"
import { makeReservation } from "../../src/adapters/ormAdapter/protocols/reservationProtocols"
import { createUser } from "../../src/adapters/ormAdapter/protocols/userProtocols"
import { IBook } from "../../src/entities/Book"
import { IReservation } from "../../src/entities/Reservation"
import { IUser } from "../../src/entities/User"



describe ("Teste de reservas", () => {
    let bookIdToReserve: string
    let userIdToReserve: string

    beforeAll(async() =>{
        
        const newUser: Omit <IUser, "id"> ={
            username: "GiReserves",
            password: "123",
            email:"gi@reserves",
            telephone: "48999909092"
        }

        const newBook: Omit <IBook, "id"> = {
            title: "Book Reserved",
            synopsis: "This book is going to be reserved",
            price: 999,
            genre: "Business",
            author: "John Bus"
        }
        const userToReserve = await createUser.execute(newUser)
        const bookToReserve = await addBook.execute(newBook)

        userIdToReserve = userToReserve.props.id
        bookIdToReserve = bookToReserve.props.id

    })

    it("Fazer uma reserva", async() => {
        const reserves: Omit <IReservation, "id"> = {
            userId: userIdToReserve,
            bookId: bookIdToReserve,
            price: 20
        }

        const makeReservationUseCase = new MakeReservationUseCase(makeReservation)

        
    })

})