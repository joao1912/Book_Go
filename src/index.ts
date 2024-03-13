import Server  from "./server.js";
import HTTPAdapter from "./adapters/HTTPAdapter/protocol.js";
import dotenv from "dotenv";
dotenv.config();

const server = new Server(HTTPAdapter)

server.start()