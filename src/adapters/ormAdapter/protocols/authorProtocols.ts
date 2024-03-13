import { CreateAuthor } from "../prismaAdapter/author/CreateAuthor.js";
import { DeleteAllAuthors } from "../prismaAdapter/author/DeleteAllAuthors.js";
import { DeleteAuthor } from "../prismaAdapter/author/DeleteAuthor.js";
import { GetAllAuthors } from "../prismaAdapter/author/GetAllAuthors.js";
import { GetAuthorById } from "../prismaAdapter/author/GetAuthorById.js";
import { GetAuthorByName } from "../prismaAdapter/author/GetAuthorByName.js";
import { UpdateAuthor } from "../prismaAdapter/author/UpdateAuthor.js";


export const createAuthor = new CreateAuthor()

export const deleteAllAuthors = new DeleteAllAuthors()

export const deleteAuthor = new DeleteAuthor()

export const getAllAuthors = new GetAllAuthors()

export const getAuthorById = new GetAuthorById()

export const getAuthorByName = new GetAuthorByName() 

export const updateAuthor = new UpdateAuthor()