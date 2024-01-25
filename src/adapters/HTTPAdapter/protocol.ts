import { Request, Response } from "express";
import { expressAdapter } from "./expressAdapter";
const HTTPAdapter = new expressAdapter()

export interface HttpRequest extends Request {}

export interface HttpResponse extends Response {}

export default HTTPAdapter