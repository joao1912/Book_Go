import { Router } from "express";
import makeReservationController from "../../controllers/reservationController/MakeReservation";
import getReservationByUserIdController from "../../controllers/reservationController/GetReservationByUserId";
import getReservationByBookIdController from "../../controllers/reservationController/GetReservationByBookId";
import deleteReservationController from "../../controllers/reservationController/DeleteReservation";
import getAllReservationsController from "../../controllers/reservationController/GetAllReservations";
import Auth from "../../middlewares/Auth";


const reservationRouter = Router()

reservationRouter.get('/all', Auth.execute, getAllReservationsController.handle)

reservationRouter.get('/book/:book_id', Auth.execute, getReservationByBookIdController.handle)

reservationRouter.get('/user/:user_id', Auth.execute, getReservationByUserIdController.handle)

reservationRouter.post('/user/:user_id', Auth.execute, makeReservationController.handle)

reservationRouter.delete('/delete', Auth.execute, deleteReservationController.handle)


export default reservationRouter