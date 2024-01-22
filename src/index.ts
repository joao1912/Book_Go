import { GetAll } from "./adapters/ormAdapter/prismaAdapter/GetAll";
import { GetAllUsers } from "./usecases/user/getAllUsers";

const ormGetAll = new GetAll() 

const getAllUsers = new GetAllUsers(ormGetAll)

