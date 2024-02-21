import { Router } from "express";
import getMycommentsController from "../../controllers/commentController/GetMyComments";
import getAllCommentsByBookIdController from "../../controllers/commentController/GetAllCommentsByBookId";
import createCommentController from "../../controllers/commentController/CreateComment";

const commentRouter = Router()


commentRouter.get('/myComments', getMycommentsController.handle)

commentRouter.get('/searchAllComments/:bookId', getAllCommentsByBookIdController.handle)

commentRouter.post('/createComment', createCommentController.handle)

commentRouter.put('/editComment')

commentRouter.delete('/removeComment')

export default commentRouter