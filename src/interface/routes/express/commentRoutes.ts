import { Router } from "express";

const commentRouter = Router()


commentRouter.get('/myComments')

commentRouter.get('/searchAllComments')

commentRouter.post('/createComment')

commentRouter.put('/editComment')

commentRouter.delete('/removeComment')

export default commentRouter