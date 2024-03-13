import { HTTPAdapterRepository } from "./repository/HTTPAdapterRepository";
import express, { Application } from "express";
import cors from "cors"
import {createHttpTerminator} from 'http-terminator'
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "../../../swagger.json" assert { type: "json" };

import userRouter from "../../interface/routes/express/userRoutes.js";
import bookRouter from "../../interface/routes/express/bookRoutes.js";
import reservationRouter from "../../interface/routes/express/reservationRoutes.js";
import stockRouter from "../../interface/routes/express/stockRoutes.js";
import commentRouter from "../../interface/routes/express/commentRoutes.js";
import financeRouter from "../../interface/routes/express/financeRoutes.js";

export default class expressAdapter implements HTTPAdapterRepository {

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

        this.app.use("/api-docs", swaggerUi.serve , swaggerUi.setup(swaggerDocs))
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(cors())
        this.setRoutes()
    }

    getApp(): Application {

        return this.app

    }
    async close(): Promise<void> {
       
        const server =  this.app.listen(process.env.PORT)
        const httpTerminator = createHttpTerminator({ server })
    
            await httpTerminator.terminate()

    }

}