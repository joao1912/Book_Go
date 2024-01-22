import express, { Router } from "express";
import { IRouterAdapterRepository } from "./repository/IRouterAdapterRepository";


export class ExpressRouter implements IRouterAdapterRepository {

    protected Router: Router
    constructor() {
        this.Router = express.Router()
    }

    get(rota: string, controller: any): void {
        
        this.Router.get(rota, controller)

    }

    post(rota: string, controller: any): void {

        this.Router.post(rota, controller)

    }

    put(rota: string, controller: any): void {

        this.Router.put(rota, controller)

    }

    delete(rota: string, controller: any): void {
        
        this.Router.delete(rota, controller)

    }
    
}