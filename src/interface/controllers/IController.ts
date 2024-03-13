import { HttpRequest, HttpResponse } from "../../adapters/HTTPAdapter/protocol.js";

export interface IController {

    formatter?(data: any): any

    handle(req: HttpRequest, res: HttpResponse): Promise<any>

}