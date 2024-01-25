import { CreateUser } from "./prismaAdapter/user/CreateUser";
import { DeleteAllUsers } from "./prismaAdapter/user/DeleteAllUsers";
import { DeleteUser } from "./prismaAdapter/user/DeleteUser";
import { GetAllUsers } from "./prismaAdapter/user/GetAllUsers";
import { GetById } from "./prismaAdapter/user/GetById";
import { UpdateUser } from "./prismaAdapter/user/UpdateUser";

export const createUser = new CreateUser()

export const deleteUser = new DeleteUser()

export const getAllUsers = new GetAllUsers()

export const getById = new GetById()

export const updateUser = new UpdateUser()

export const deleteAllUsers = new DeleteAllUsers()