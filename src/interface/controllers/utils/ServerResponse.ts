import { HttpResponse } from "../../../adapters/HTTPAdapter/protocol";

class ServerResponse {
    public response: HttpResponse;
  
    
    constructor(res: HttpResponse){
        this.response = res;
   
    }

    ok(message: any): void {
        this.response.status(200).json(message);
    }
        
    badRequest(message: any): void {
        this.response.status(400).json(message);
    }

    notAuthorized(message: any): void {
        this.response.status(401).json(message);
    }

    notFound(message: any): void {
        this.response.status(404).json(message);
    }

    missingParameters(message: any): void {
        this.response.status(422).json(message);
    }

    serverError(message: any): void {
        this.response.status(500).json(message);
    }
    
}

export default ServerResponse;
