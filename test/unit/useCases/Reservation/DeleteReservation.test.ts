import { addBook } from "../../../../src/adapters/ormAdapter/protocols/bookProtocols";
import {
  deleteReservation,
  makeReservation,
} from "../../../../src/adapters/ormAdapter/protocols/reservationProtocols";
import { createUser } from "../../../../src/adapters/ormAdapter/protocols/userProtocols";
import { IBook } from "../../../../src/entities/Book";
import {
  IReservation,
  Reservation,
} from "../../../../src/entities/Reservation";
import { IUser, User } from "../../../../src/entities/User";
import { DeleteReservationUseCase } from "../../../../src/usecases/reservation/DeleteReservationUseCase";

describe("Criando dados necessários para pegar a reserva de um livro por id", () => {
  let userOneId: string;
  let bookId: string;
  let reservationId: string
  beforeAll(async () => {
    const userOne: Omit<IUser, "id"> = {
      username: "Zoo",
      password: "4308",
      email: "zoo@gmail.com",
      telephone: "3322229450",
    };

    const bookOne: Omit<IBook, "id"> = {
      title: "Book To Delete Reserve",
      synopsis: "This is book three",
      price: 22,
      author: "Gem",
      genre: "Fantasia",
    };

    const newUser = await createUser.execute(userOne);
    const newBook = await addBook.execute(bookOne);

    userOneId = newUser.props.id;
    bookId = newBook.props.id;

    const reserve: Omit<IReservation, "id"> = {
      userId: userOneId,
      bookId: bookId,
      price: 23,
      status: "Transcorrendo",
    };

    const reserveData = await makeReservation.execute(reserve);
    reservationId = reserveData.props.id
  });

  it("Pesquisando reserva por book id", async () => {
    const deleteBookUseCase = new DeleteReservationUseCase(deleteReservation);

    const result = await deleteBookUseCase.execute(reservationId);

    //Usar arraycontaining
    expect(result.message).toBe('Reservada deletada com sucesso!')

  
  });
});
