import { CreateComment } from "../prismaAdapter/comment/CreateComment.js";
import { DeleteAllComments } from "../prismaAdapter/comment/DeleteAllComments.js";
import { DeleteComment } from "../prismaAdapter/comment/DeleteComment.js";
import { GetAllComments } from "../prismaAdapter/comment/GetAllComments.js";
import { GetAllCommentsByUserId } from "../prismaAdapter/comment/GetAllCommentsByUserId.js";
import { GetCommentById } from "../prismaAdapter/comment/GetCommentById.js";
import { UpdateComment } from "../prismaAdapter/comment/UpdateComment.js";


export const createComment = new CreateComment()

export const deleteAllComments = new DeleteAllComments()

export const deleteComment = new DeleteComment()

export const getAllComments = new GetAllComments()

export const getCommentById = new GetCommentById()

export const getAllCommentsByUserId = new GetAllCommentsByUserId()

export const updateComment = new UpdateComment()