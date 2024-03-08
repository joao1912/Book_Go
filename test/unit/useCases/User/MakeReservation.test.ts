import { addBook } from "../../../../src/adapters/ormAdapter/protocols/bookProtocols"
import { makeReservation } from "../../../../src/adapters/ormAdapter/protocols/reservationProtocols"
import { createUser } from "../../../../src/adapters/ormAdapter/protocols/userProtocols"
import { Book } from "../../../../src/entities/Book"
import { IReservation, Reservation } from "../../../../src/entities/Reservation"
import { User } from "../../../../src/entities/User"
import { MakeReservationUseCase } from "../../../../src/usecases/reservation/MakeReservationUseCase"



describe ("Teste de reservas", () => {
    let bookIdToReserve: string
    let userIdToReserve: string

    beforeAll(async() =>{
        
        const newUser = new User({
            username: "GiReserves",
            password: "123",
            email:"gi@reserves",
            telephone: "48999909092"
        })

        const newBook = new Book({
            title: "Book Reserved",
            synopsis: "This book is going to be reserved",
            price: 999,
            genre: "Business",
            author: "John Bus",
            pageCount: 73,
            publishedDate: '2001-04-09',
        })
        const userToReserve = await createUser.execute(newUser)
        const bookToReserve = await addBook.execute(newBook)

        if(userToReserve.props.id){userIdToReserve = userToReserve.props.id}
        if(bookToReserve instanceof Book && bookToReserve.props.id){bookIdToReserve = bookToReserve.props.id}

    })

    it("Fazer uma reserva", async() => {
        const reserves: IReservation = {
            userId: userIdToReserve,
            bookId: bookIdToReserve,
            price: 20,
            status: "Transcorrendo",
            
        }

        const makeReservationUseCase = new MakeReservationUseCase(makeReservation)

        const result = await makeReservationUseCase.execute(reserves)

        expect(result).toBeInstanceOf(Reservation)
        
    })



})