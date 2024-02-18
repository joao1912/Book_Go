import { NextFunction, Request, Response } from "express";
import { expressAdapter } from "./expressAdapter";
const HTTPAdapter = new expressAdapter()

export interface HttpRequest<T1 = any, T2 = any, ReqBody = any> extends Request<T1, T2, ReqBody> {
    userId?: string;
}

export interface HttpResponse extends Response {}

export interface HttpNext extends NextFunction {}
export default HTTPAdapter