import { HTTPAdapterRepository } from "./repository/HTTPAdapterRepository";
import express, { Application } from "express";
import cors from "cors"

import userRouter from "../../interface/routes/express/userRoutes";
import bookRouter from "../../interface/routes/express/bookRoutes";
import reservationRouter from "../../interface/routes/express/reservationRoutes";
import stockRouter from "../../interface/routes/express/stockRoutes";

export class expressAdapter implements HTTPAdapterRepository {

    protected app: Application

    constructor() {
        this.app = express()
    }

    listen(): void {
        
        this.app.listen(process.env.PORT, () => {
            console.log(`server is running in port ${process.env.PORT}`)
        })

    }

    setRoutes(): void {

        this.app.use('/v1/users', userRouter)
        this.app.use('/v1/book', bookRouter)
        this.app.use('/v1/reservation', reservationRouter)
        this.app.use('/v1/stock', stockRouter)
        
    }

    config(): void {
        
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended: true}))
        this.app.use(cors())
        this.setRoutes()
    }
    
}