import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import Router from "../../../adapters/routeAdapter/protocol";

const userRouter = new Router()

userRouter.get('/', function(req: HttpRequest, res: HttpResponse) {
    
    res.status(200).json('só pra testar')

})

//tem que testar com middlewares(e como tratar esse middlewares, precisam ser tipados em um contrato o next por exemplo)

export default userRouter.getRoute()