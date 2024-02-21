import { Router } from "express";
import getMycommentsController from "../../controllers/commentController/GetMyComments";
import getAllCommentsByBookIdController from "../../controllers/commentController/GetAllCommentsByBookId";
import createCommentController from "../../controllers/commentController/CreateComment";
import updateCommentController from "../../controllers/commentController/UpdateComment";
import removeCommentController from "../../controllers/commentController/RemoveComment";
import Auth from "../../middlewares/Auth";

const commentRouter = Router()


commentRouter.get('/myComments', Auth.execute, getMycommentsController.handle)

commentRouter.get('/searchAllComments/:bookId', getAllCommentsByBookIdController.handle)

commentRouter.post('/createComment', Auth.execute, createCommentController.handle)

commentRouter.put('/editComment', Auth.execute, updateCommentController.handle) // tem que arrumar

commentRouter.delete('/removeComment/:commentId', Auth.execute, removeCommentController.handle)

export default commentRouter