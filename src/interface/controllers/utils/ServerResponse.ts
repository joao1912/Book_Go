import { HttpResponse } from "../../../adapters/HTTPAdapter/protocol";


class ServerResponse {
    public response: HttpResponse;

    constructor(res: HttpResponse) {
        this.response = res;
    }

    ok(message: any): void {
        this.response.status(200).json(message);
    }

}

export default ServerResponse;
