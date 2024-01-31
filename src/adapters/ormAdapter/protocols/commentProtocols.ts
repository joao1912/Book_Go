import { CreateComment } from "../prismaAdapter/comment/CreateComment";
import { DeleteAllComments } from "../prismaAdapter/comment/DeleteAllComments";
import { DeleteComment } from "../prismaAdapter/comment/DeleteComment";
import { GetAllComments } from "../prismaAdapter/comment/GetAllComments";
import { GetCommentById } from "../prismaAdapter/comment/GetCommentById";
import { UpdateComment } from "../prismaAdapter/comment/UpdateComment";


export const createFinance = new CreateComment()

export const deleteAllComments = new DeleteAllComments()

export const deleteComment = new DeleteComment()

export const getAllComments = new GetAllComments()

export const getCommentById = new GetCommentById()

export const updateComment = new UpdateComment()