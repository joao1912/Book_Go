import { CreateUser } from "../prismaAdapter/user/CreateUser.js";
import { DeleteAllUsers } from "../prismaAdapter/user/DeleteAllUsers.js";
import { DeleteUser } from "../prismaAdapter/user/DeleteUser.js";
import { GetAllUsers } from "../prismaAdapter/user/GetAllUsers.js";
import {GetUser } from "../prismaAdapter/user/GetUser.js";
import { UpdateUser } from "../prismaAdapter/user/UpdateUser.js";

export const createUser = new CreateUser()

export const deleteUser = new DeleteUser()

export const getAllUsers = new GetAllUsers()

export const getUser = new GetUser()

export const updateUser = new UpdateUser()

export const deleteAllUsers = new DeleteAllUsers()