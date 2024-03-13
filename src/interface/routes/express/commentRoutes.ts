import { Router } from "express";
import getMycommentsController from "../../controllers/commentController/GetMyComments.js";
import getAllCommentsByBookIdController from "../../controllers/commentController/GetAllCommentsByBookId.js";
import createCommentController from "../../controllers/commentController/CreateComment.js";
import updateCommentController from "../../controllers/commentController/UpdateComment.js";
import removeCommentController from "../../controllers/commentController/RemoveComment.js";
import Auth from "../../middlewares/Auth.js";

const commentRouter = Router()


commentRouter.get('/myComments', Auth.execute, getMycommentsController.handle)

commentRouter.get('/searchAllComments/:bookId', getAllCommentsByBookIdController.handle)

commentRouter.post('/createComment', Auth.execute, createCommentController.handle)

commentRouter.put('/editComment', Auth.execute, updateCommentController.handle)

commentRouter.delete('/removeComment/:commentId', Auth.execute, removeCommentController.handle)

export default commentRouter