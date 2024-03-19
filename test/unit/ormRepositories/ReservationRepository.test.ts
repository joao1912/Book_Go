import { addBook } from "../../../src/adapters/ormAdapter/protocols/bookProtocols";
import { deleteReservation, getAllReservations, getReservationByBookId, getReservationByUserId, makeReservation } from "../../../src/adapters/ormAdapter/protocols/reservationProtocols";
import { createUser } from "../../../src/adapters/ormAdapter/protocols/userProtocols";
import { Book, IBook } from "../../../src/entities/Book";
import { IReservation, Reservation } from "../../../src/entities/Reservation";
import { IUser, User } from "../../../src/entities/User";



describe('Testes do ReservantionRepository', () => {


    let stockSearchByTitle: string;
    let bookId1: string;
    let bookId2: string;
    let userId1: string;
    let userId2: string;
    let reservationId: string



    beforeAll(async () => {

        // Criar um livro buscar o estoque

        const book1: IBook = ({
            title: "ORM Stock to search",
            synopsis: "This is a test to search a Stock just with orm",
            price: 1,
            genre: "Test ORM",
            author: "Wilson",
            pageCount: 123,
            publishedDate: '2003-10-09'
        })

        const bookInstance1 = new Book(book1)

        await addBook.execute(bookInstance1)
            .then((result) => {

                if (result instanceof Book) {
                    bookId1 = result.props.id!
                }

            })
        const book2: IBook = ({
            title: "ORM Stock to search",
            synopsis: "This is a test to search a Stock just with orm",
            price: 1,
            genre: "Test ORM",
            author: "Wilson",
            pageCount: 123,
            publishedDate: '2003-10-09'
        })

        const bookInstance2 = new Book(book2)

        await addBook.execute(bookInstance2)
            .then(result => {

                if (result instanceof Book) {
                    bookId2 = result.props.id!
                }

            })

        // Criando user para reservar

        const user1: IUser = ({
            username: "User ORMReservation",
            email: "user@gmail.com",
            password: "123",
            telephone: "489999920304"

        })

        const userInstance = new User(user1)

        await createUser.execute(userInstance)
            .then(result => {
                if (result instanceof User) { 

                    userId1 = result.props.id! 

                }
            })
        const user2: IUser = ({
            username: "User2 ORMReservation",
            email: "user2@gmail.com",
            password: "123",
            telephone: "489999920344"

        })

        const userInstance2 = new User(user2)

        await createUser.execute(userInstance2)
            .then(result => {
                if (result instanceof User) { 
                    userId2 = result.props.id! 
                }
            })

        //Fazer reserva para testes de delete e search

        const reservation1: IReservation = ({
            userId: userId1,
            bookId: bookId1,
            price: 20,
            status: "ON GOING"
        })

        const reservationInstance = new Reservation(reservation1)

        await makeReservation.execute(reservationInstance)

        const reservationDelete: IReservation = ({
            userId: userId1,
            bookId: bookId1,
            price: 20,
            status: "ON GOING"
        })

        const reservationInstance2 = new Reservation(reservationDelete)

        await makeReservation.execute(reservationInstance2)
            .then(result => {

                if (result instanceof Reservation) {
                    reservationId = result.props.id!
                }

            })



    })

    it('Deve fazer uma reserva', async () => {

        const reservation: IReservation = ({
            userId: userId2,
            bookId: bookId1,
            price: 20,
            status: "ON GOING"
        })

        const reservationInstance2 = new Reservation(reservation)

        const result = await makeReservation.execute(reservationInstance2)

        expect(result).toBeInstanceOf(Reservation)

    })


    it('Deve deletar uma reserva', async () => {

        const result = await deleteReservation.execute(reservationId)

        expect(result).toEqual({
            message: "Reservation deleted successfully."
        })

    })


    it("Deve buscar reserva por id do livro", async () => {

        const result = await getReservationByBookId.execute(bookId1)
        if(result instanceof Reservation && Array.isArray(result)){

            for (let reserve of result) {
                expect(reserve).toBeInstanceOf(Reservation)
            }
        }
    })


    it("Deve buscar reserva por id do user", async () => {

        const result = await getReservationByUserId.execute(userId1)
        if(result instanceof Reservation && Array.isArray(result)){

            for (let reserve of result) {
                expect(reserve).toBeInstanceOf(Reservation)
            }
        }
    })


    it('Deve buscar todas as reservas', async () => {

        const result = await getAllReservations.execute()
        if(result instanceof Reservation && Array.isArray(result)){
            expect(result.length).toBeGreaterThan(0)

            for (let reserves of result) expect(reserves).toBeInstanceOf(Reservation)
        }

    })
})