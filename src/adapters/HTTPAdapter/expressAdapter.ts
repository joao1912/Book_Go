import { HTTPAdapterRepository } from "./repository/HTTPAdapterRepository";
import express, { Application } from "express";
import cors from "cors"

import userRouter from "../../interface/routes/express/userRoutes";

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

        this.app.use('/users', userRouter)
        
    }

    config(): void {
        
        this.setRoutes()
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended: true}))
        this.app.use(cors())

    }
    
}