import { HttpRequest, HttpResponse } from "../../adapters/HTTPAdapter/protocol";

export interface IController {

    handle(req: HttpRequest, res: HttpResponse): Promise<any>

}