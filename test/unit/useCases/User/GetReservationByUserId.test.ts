import { addBook } from "../../../../src/adapters/ormAdapter/protocols/bookProtocols";
import {  getReservationByUserId,  makeReservation,} from "../../../../src/adapters/ormAdapter/protocols/reservationProtocols";
import { createUser } from "../../../../src/adapters/ormAdapter/protocols/userProtocols";
import { Book } from "../../../../src/entities/Book";
import { Reservation} from "../../../../src/entities/Reservation";
import { User } from "../../../../src/entities/User";
import { GetReservationByUserIdUseCase } from "../../../../src/usecases/reservation/GetReservationByUserIdUseCase";

describe("Criando dados necessários para pegar a reserva de um usuário por id", () => {
  let userOneId: string;
  let bookId: string;
  beforeAll(async () => {
    const userOne = new User({
      username: "SearchUserReserve",
      password: "4W8",
      email: "userreserve@",
      telephone: "3322224453",
    });

    const bookOne = new Book({
      title: "Book To Search User Reserve",
      synopsis: "This is book one of a kind",
      price: 33,
      author: "Grip",
      genre: "Fantasia",
      pageCount: 73,
      publishedDate: '2001-04-09',
    });

    const newUser = await createUser.execute(userOne);
    const newBook = await addBook.execute(bookOne);

    if (newUser instanceof User) { userOneId = newUser.props.id }
    if (newBook instanceof Book && newBook.props.id) { bookId = newBook.props.id }

    const reserve = new Reservation({
      userId: userOneId,
      bookId: bookId,
      price: 23,
      status: "Finished",
    });

    await makeReservation.execute(reserve);
  });

  it("Pesquisando reserva por book id", async () => {
    const getReservationByUserIdUseCase = new GetReservationByUserIdUseCase(
      getReservationByUserId
    );

    const result = await getReservationByUserIdUseCase.execute(userOneId);

    if(result instanceof Reservation && Array.isArray(result))
    for (let prop of result) {

      expect(prop).toBeInstanceOf(Reservation)
    }

  });
});
