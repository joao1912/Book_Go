import { addBook } from "../../../../src/adapters/ormAdapter/protocols/bookProtocols";
import { deleteReservation, makeReservation, } from "../../../../src/adapters/ormAdapter/protocols/reservationProtocols";
import { createUser } from "../../../../src/adapters/ormAdapter/protocols/userProtocols";
import { Book } from "../../../../src/entities/Book";
import { Reservation } from "../../../../src/entities/Reservation";
import { User } from "../../../../src/entities/User";
import { DeleteReservationUseCase } from "../../../../src/usecases/reservation/DeleteReservationUseCase";

describe("Criando dados necessários para pegar a reserva de um livro por id", () => {
  let userOneId: string;
  let bookId: string;
  let reservationId: string
  beforeAll(async () => {

    const userOne = new User({
      username: "Zookkaa",
      password: "4308",
      email: "zoo@gmail.com",
      telephone: "4033002039045",
    });

    const bookOne = new Book({
      title: "Book To Delete Reserve",
      synopsis: "This is book three",
      price: 22,
      author: "Gem",
      genre: "Fantasia",
      pageCount: 73,
      publishedDate: '2001-04-09',
    });

    const newUser = await createUser.execute(userOne);
    const newBook = await addBook.execute(bookOne);

    if (newUser instanceof User) { userOneId = newUser.props.id };
    if (newBook instanceof Book && newBook.props.id) { bookId = newBook.props.id }

    const reserve = new Reservation({
      userId: userOneId,
      bookId: bookId,
      price: 23,
      status: "Transcorrendo",
    });

    const reserveData = await makeReservation.execute(reserve);
    if ( reserveData instanceof Reservation) { reservationId = reserveData.props.id }
  });

  it("Pesquisando reserva por book id", async () => {
    const deleteBookUseCase = new DeleteReservationUseCase(deleteReservation);

    const result = await deleteBookUseCase.execute(reservationId);

    expect(result).toBe('Reservation deleted successfully.')


  });
});
