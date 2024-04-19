import { httpClientAdapter } from "../../../src/adapters/httpClientAdapter/protocol"
import ApiBookGoogle from "../../../src/external/ApiBookGoogle"


describe('## GET ##', () => {

    it('Deve retornar o volume de acordo com o titulo', async () => {

        const apiBookGoogle = new ApiBookGoogle(httpClientAdapter)

        const book = await apiBookGoogle.findBook('Harry Potter')

        const data = book

        console.log(data)

    })

})