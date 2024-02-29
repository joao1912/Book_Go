import { HTTPAdapterRepository } from "./repository/HTTPAdapterRepository";
import express, { Application } from "express";
import cors from "cors"
import {createHttpTerminator} from 'http-terminator'

import userRouter from "../../interface/routes/express/userRoutes";
import bookRouter from "../../interface/routes/express/bookRoutes";
import reservationRouter from "../../interface/routes/express/reservationRoutes";
import stockRouter from "../../interface/routes/express/stockRoutes";
import commentRouter from "../../interface/routes/express/commentRoutes";
import financeRouter from "../../interface/routes/express/financeRoutes";

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
        this.app.use('/v1/comment', commentRouter)
        this.app.use('/v1/finance', financeRouter)

    }

    config(): void {

        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(cors())
        this.setRoutes()
    }

    getApp(): Application {

        return this.app

    }
    close(): void {
        // const { createHttpTerminator } = require('http-terminator')
       
        const server =  this.app.listen(process.env.PORT)
        const httpTerminator = createHttpTerminator({ server })
    
            httpTerminator.terminate()

    }

}