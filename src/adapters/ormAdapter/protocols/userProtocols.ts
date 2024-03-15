import { CreateUser } from "../prismaAdapter/user/CreateUser";
import { DeleteAllUsers } from "../prismaAdapter/user/DeleteAllUsers";
import { DeleteUser } from "../prismaAdapter/user/DeleteUser";
import { GetAllUsers } from "../prismaAdapter/user/GetAllUsers";
import {GetUser } from "../prismaAdapter/user/GetUser";
import { UpdateUser } from "../prismaAdapter/user/UpdateUser";

export const createUser = new CreateUser()

export const deleteUser = new DeleteUser()

export const getAllUsers = new GetAllUsers()

export const getUser = new GetUser()

export const updateUser = new UpdateUser()

export const deleteAllUsers = new DeleteAllUsers()