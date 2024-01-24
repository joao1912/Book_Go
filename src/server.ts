import { HTTPAdapterRepository } from "./adapters/HTTPAdapter/repository/HTTPAdapterRepository"

export class Server {

    protected HTTPAdapter: HTTPAdapterRepository
    constructor(HTTP: HTTPAdapterRepository) {

        this.HTTPAdapter = HTTP

    }

    start(): void {

        this.HTTPAdapter.config()
        this.HTTPAdapter.listen()

    }

}