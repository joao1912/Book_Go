import { DeleteReservation } from "../prismaAdapter/reservation/DeleteReservation.js";
import { GetAllReservations } from "../prismaAdapter/reservation/GetAllReservations.js";
import { GetReservationByBookId } from "../prismaAdapter/reservation/GetReservationByBookId.js";
import { GetReservationByUserId } from "../prismaAdapter/reservation/GetReservationByUserId.js";
import { MakeReservation } from "../prismaAdapter/reservation/MakeReservation.js";


export const deleteReservation = new DeleteReservation()

export const makeReservation = new MakeReservation()

export const getAllReservations = new GetAllReservations()

export const getReservationByBookId = new GetReservationByBookId()

export const getReservationByUserId = new GetReservationByUserId()