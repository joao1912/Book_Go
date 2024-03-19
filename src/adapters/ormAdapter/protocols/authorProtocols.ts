import { CreateAuthor } from "../prismaAdapter/author/CreateAuthor";
import { DeleteAllAuthors } from "../prismaAdapter/author/DeleteAllAuthors";
import { DeleteAuthor } from "../prismaAdapter/author/DeleteAuthor";
import { GetAllAuthors } from "../prismaAdapter/author/GetAllAuthors";

import { GetAuthorByName } from "../prismaAdapter/author/GetAuthorByName";
import { GetAuthorById } from "../prismaAdapter/author/GetAuthorByid";
import { UpdateAuthor } from "../prismaAdapter/author/UpdateAuthor";


export const createAuthor = new CreateAuthor()

export const deleteAllAuthors = new DeleteAllAuthors()

export const deleteAuthor = new DeleteAuthor()

export const getAllAuthors = new GetAllAuthors()

export const getAuthorById = new GetAuthorById()

export const getAuthorByName = new GetAuthorByName() 

export const updateAuthor = new UpdateAuthor()