import { addBook } from "../../../../src/adapters/ormAdapter/protocols/bookProtocols";
import {
  getReservationByBookId,
  makeReservation,
} from "../../../../src/adapters/ormAdapter/protocols/reservationProtocols";
import { createUser } from "../../../../src/adapters/ormAdapter/protocols/userProtocols";
import { Book } from "../../../../src/entities/Book";
import {
  Reservation
} from "../../../../src/entities/Reservation";
import { User } from "../../../../src/entities/User";
import { GetReservationByBookIdUseCase } from "../../../../src/usecases/reservation/GetReservationByBookIdUseCase";

describe("Criando dados necessários para pegar a reserva de um livro por id", () => {
  let userOneId: string;
  let bookId: string;
  beforeAll(async () => {
    const userOne = new User({
      username: "Abelha",
      password: "4308",
      email: "abelha@",
      telephone: "3322224450",
    });

    const bookOne = new Book({
      title: "Book To Search Book Reserves",
      synopsis: "This is book one",
      price: 33,
      author: "Gem",
      genre: "Fantasia",
      pageCount: 3,
      publishedDate: '2015-04-09',
    });

    const newUser = await createUser.execute(userOne);
    const newBook = await addBook.execute(bookOne);

    if (newUser instanceof User) { userOneId = newUser.props.id! };
    if (newBook instanceof Book && newBook.props.id) { bookId = newBook.props.id };

    const reserve = new Reservation({
      userId: userOneId,
      bookId: bookId,
      price: 33,
      status: "Transcorrendo",
    });

    await makeReservation.execute(reserve);
  });

  it("Pesquisando reserva por book id", async () => {
    const getReservationByBookIdUseCase = new GetReservationByBookIdUseCase(
      getReservationByBookId
    );

    const result = await getReservationByBookIdUseCase.execute(bookId);

    if(result instanceof Reservation && Array.isArray(result))
    for (let prop of result) {

      expect(prop).toBeInstanceOf(Reservation)
    }

  });
});
