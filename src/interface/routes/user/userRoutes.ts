import Router from "../../../adapters/routeAdapter/protocol";

const userRouter = new Router()

userRouter.get('/', function() {
    console.log('rota de teste')
})

export default userRouter.getRoute()