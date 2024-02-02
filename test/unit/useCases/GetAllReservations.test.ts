import { addBook } from "../../../src/adapters/ormAdapter/protocols/bookProtocols";
import { getAllReservations, makeReservation } from "../../../src/adapters/ormAdapter/protocols/reservationProtocols";
import { createUser } from "../../../src/adapters/ormAdapter/protocols/userProtocols";
import { IGetAllReservation } from "../../../src/adapters/ormAdapter/repositories/reservation/IGetAllReservations";
import { IBook } from "../../../src/entities/Book";
import { IReservation, Reservation } from "../../../src/entities/Reservation";
import { IUser } from "../../../src/entities/User";
import { GetAllReservationsUseCase } from "../../../src/usecases/reservation/GetAllReservationsUseCase";
import CleanDataBase from "../../util/CleanDataBase";

describe("Pega todas as reservas da biblioteca", () => {
  let userOneId: string;
  let userTwoId: string;
  let newBookId: string

  beforeAll(async () => {
    const userOne: Omit<IUser, "id"> = {
      username: "Chico",
      password: "123",
      email: "chico@bento",
      telephone: "48999900023",
    };

    const userTwo: Omit<IUser, "id"> = {
      username: "Beast",
      password: "beastisthebest",
      email: "beast@bestest",
      telephone: "4899992023",
    };

    const userOneData = await createUser.execute(userOne);
    const userTwoData = await createUser.execute(userTwo);

    userOneId = userOneData.props.id;
    userTwoId = userTwoData.props.id;

    const newBook: Omit<IBook, "id"> = {
      title: "The Best One",
      synopsis: "Once upon a time",
      price: 1,
      genre: "Biografy",
      author: "Wilson",
    };

    const newBookData = await addBook.execute(newBook)
    newBookId = newBookData.props.id

    const reservationOne: Omit <IReservation, "id"> ={
        userId: userOneId,
        bookId: newBookId,
        price: 2,
        status: "Transcorrendo"
    }
    const reservationTwo: Omit <IReservation, "id"> ={
        userId: userTwoId,
        bookId: newBookId,
        price: 2,
        status: "Transcorrendo"
    }

   await makeReservation.execute(reservationOne)
   await makeReservation.execute(reservationTwo)


  });

  it("deve retornar todas as reservas criadas", async()=> {

    const getAllReservationsUseCase = new GetAllReservationsUseCase(getAllReservations)

    const result = await getAllReservationsUseCase.execute()

    expect(result[0]).toBeInstanceOf(Reservation)

  })

  afterAll(async () => {

    await CleanDataBase.execute()
    
})
});
