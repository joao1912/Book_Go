import { Router } from "express";
import getMycommentsController from "../../controllers/commentController/GetMyComments";
import getAllCommentsByBookIdController from "../../controllers/commentController/GetAllCommentsByBookId";
import createCommentController from "../../controllers/commentController/CreateComment";
import updateCommentController from "../../controllers/commentController/UpdateComment";
import removeCommentController from "../../controllers/commentController/RemoveComment";

const commentRouter = Router()


commentRouter.get('/myComments', getMycommentsController.handle)

commentRouter.get('/searchAllComments/:bookId', getAllCommentsByBookIdController.handle)

commentRouter.post('/createComment', createCommentController.handle)

commentRouter.put('/editComment', updateCommentController.handle) // tem que arrumar

commentRouter.delete('/removeComment/:commentId', removeCommentController.handle)

export default commentRouter