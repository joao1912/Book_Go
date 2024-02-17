import { Router } from "express";
import makeReservationController from "../../controllers/reservationController/MakeReservation";
import getReservationByUserIdController from "../../controllers/reservationController/GetReservationByUserId";
import getReservationByBookIdController from "../../controllers/reservationController/GetReservationByBookId";
import deleteReservationController from "../../controllers/reservationController/DeleteReservation";
import getAllReservationsController from "../../controllers/reservationController/GetAllReservations";


const reservationRouter = Router()

reservationRouter.get('/', getAllReservationsController.handle)

reservationRouter.get('/user/:user_id/book/:book_id', makeReservationController.handle)

reservationRouter.get('/user/:user_id', getReservationByUserIdController.handle)

reservationRouter.get('/book/:book_id', getReservationByBookIdController.handle)

reservationRouter.delete('/:id', deleteReservationController.handle)


export default reservationRouter