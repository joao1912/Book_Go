import request from "supertest"
import HTTPAdapter from "../../../../src/adapters/HTTPAdapter/protocol"
import { IBook } from "../../../../src/entities/Book";


describe('## GET ##', () => {

    let app: any;
    let tokenAdmin: string;

    const addingBook: IBook = {
        title: "O Jardim das Almas",
        synopsis: "Adentre os segredos ocultos nos recantos mais profundos da alma humana. Este livro é uma jornada poética que mergulha nas complexidades da existência, convidando você a refletir sobre a beleza e a escuridão que residem em cada um de nós.",
        price: 20,
        author: "Khalil Gibran",
        pageCount: 72,
        publishedDate: "1923-04-06",
        genre: "Poesia"
    }

    beforeAll(async () => {

        HTTPAdapter.config()
        app = HTTPAdapter.getApp()

        await request(app)
            .post("/v1/users/login")
            .send({
                email: "admin_teste@gmail.com",
                password: "123.aB"
            })
            .expect(200)
            .then(response => {

                const tokenJSON = response.body;
                expect(tokenJSON).toHaveProperty('token');
                tokenAdmin = tokenJSON.token;

            })
        

        await request(app)
            .post(`/v1/book/add`)
            .set('Authorization', `${tokenAdmin}`)
            .send(addingBook)
            .expect(200)

    })

    it("Deve procurar estoque por quantidade", async () => {

        await request(app)
            .get(`/v1/stock/book/quantity?quantity=1`)
            .set('Authorization', `${tokenAdmin}`)
            .expect(200)
            .then(response => {

                expect(response.body[0]).toHaveProperty("quantity");

            })
       
    })

    it("Deve tentar ver stock sem token", async () => {

        await request(app)
            .get(`/v1/stock/book/quantity?quantity=1`)
            .expect(401)
            .then(response => {

                expect(response.body).toEqual({ message:"Must have an authorization token" })

            })

    })

    // it("Deve tentar ver stock com quantidade inexistente", async () => {
    //     const result = await request.agent(app)
    //         .get(`/v1/stock/book/quantity/1000`)
    //         .set('Authorization', `${tokenAdmin}`)
    //         .expect(404)
    //     expect(result.body).toEqual('No books found with this quantity.');


    // })

    afterAll(async () => {
        
        HTTPAdapter.close()

    })


})