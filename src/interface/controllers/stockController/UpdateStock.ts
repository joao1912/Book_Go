import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";


class UpdateStock {
    async handle(req: HttpRequest, res: HttpResponse){

        try {
            
            
        } catch (error) {
            throw new Error ("Bad Request " + error)
        }
    }
}