import { HttpRequest, HttpResponse } from "../../adapters/HTTPAdapter/protocol";

export interface IController {

    formatter?(data: any): any

    handle(req: HttpRequest, res: HttpResponse): Promise<any>

}