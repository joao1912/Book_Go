import { Router } from "express";
import makeReservationController from "../../controllers/reservationController/MakeReservation.js";
import getReservationByUserIdController from "../../controllers/reservationController/GetReservationByUserId.js";
import getReservationByBookIdController from "../../controllers/reservationController/GetReservationByBookId.js";
import deleteReservationController from "../../controllers/reservationController/DeleteReservation.js";
import getAllReservationsController from "../../controllers/reservationController/GetAllReservations.js";
import Auth from "../../middlewares/Auth.js";


const reservationRouter = Router()

reservationRouter.get('/all', Auth.execute, getAllReservationsController.handle)

reservationRouter.get('/book/:bookId', Auth.execute, getReservationByBookIdController.handle)

reservationRouter.get('/user/:userId', Auth.execute, getReservationByUserIdController.handle)

reservationRouter.post('/user/:userId/book/:bookId', Auth.execute, makeReservationController.handle)

reservationRouter.delete('/delete/:reservationId', Auth.execute, deleteReservationController.handle)


export default reservationRouter