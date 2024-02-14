import { Request, Response } from "express";
import { expressAdapter } from "./expressAdapter";
const HTTPAdapter = new expressAdapter()

export interface HttpRequest<T1 = any, T2 = any, ReqBody = any> extends Request<T1, T2, ReqBody> {}

export interface HttpResponse extends Response {}

export default HTTPAdapter