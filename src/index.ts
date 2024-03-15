import Server  from "./server";
import HTTPAdapter from "./adapters/HTTPAdapter/protocol";
import * as dotenv from "dotenv";
dotenv.config();

const server = new Server(HTTPAdapter)

server.start()