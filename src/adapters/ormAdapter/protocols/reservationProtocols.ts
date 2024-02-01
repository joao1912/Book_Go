import { DeleteReservation } from "../prismaAdapter/reservation/DeleteReservation";
import { GetAllReservations } from "../prismaAdapter/reservation/GetAllReservations";
import { GetReservationByBookId } from "../prismaAdapter/reservation/GetReservationByBookId";
import { GetReservationByUserId } from "../prismaAdapter/reservation/GetReservationByUserId";
import { MakeReservation } from "../prismaAdapter/reservation/MakeReservation";


export const deleteReservation = new DeleteReservation()

export const makeReservation = new MakeReservation()

export const getAllReservations = new GetAllReservations()

export const getReservationByBookId = new GetReservationByBookId()

export const getReservationByUserId = new GetReservationByUserId()