import { addBook } from "../../../../src/adapters/ormAdapter/protocols/bookProtocols";
import { getAllReservations, makeReservation } from "../../../../src/adapters/ormAdapter/protocols/reservationProtocols";
import { createUser } from "../../../../src/adapters/ormAdapter/protocols/userProtocols";
import { Book, IBook } from "../../../../src/entities/Book";
import { IReservation, Reservation } from "../../../../src/entities/Reservation";
import { IUser, User } from "../../../../src/entities/User";
import { GetAllReservationsUseCase } from "../../../../src/usecases/reservation/GetAllReservationsUseCase";


describe("Pega todas as reservas da biblioteca", () => {
  let userOneId: string;
  let userTwoId: string;
  let newBookId: string

  beforeAll(async () => {
    const userOne = new User({
      username: "Chico",
      password: "123",
      email: "chico@bento",
      telephone: "48999900023",
    });

    const userTwo = new User({
      username: "Beast",
      password: "beastisthebest",
      email: "beast@bestest",
      telephone: "4899992023",
    });

    const userOneData = await createUser.execute(userOne);
    const userTwoData = await createUser.execute(userTwo);

    if (userOneData.props.id != undefined) {
      userOneId = userOneData.props.id
    }
    if (userTwoData.props.id != undefined) {
      userTwoId = userTwoData.props.id;
    }


    const newBook = new Book ({
      title: "Book to Search All Reserves",
      synopsis: "Once upon a time",
      price: 1,
      genre: "Biography",
      author: "Wilson",
      pageCount: 73,
      publishedDate: '2001-04-09',
    });

    const newBookData = await addBook.execute(newBook)
   
   if(newBookData instanceof Book && newBookData.props.id != undefined){
     newBookId = newBookData.props.id

   }

    const reservationOne = new Reservation({
      userId: userOneId,
      bookId: newBookId,
      price: 2,
      status: "Transcorrendo"
    })
    const reservationTwo = new Reservation({
      userId: userTwoId,
      bookId: newBookId,
      price: 2,
      status: "Transcorrendo"
    })
    await makeReservation.execute(reservationOne)
    await makeReservation.execute(reservationTwo)


  });

  it("deve retornar todas as reservas criadas", async () => {

    const getAllReservationsUseCase = new GetAllReservationsUseCase(getAllReservations)

    const result = await getAllReservationsUseCase.execute()

    for (let prop of result) {

      expect(prop).toBeInstanceOf(Reservation)
    }

  })

});
