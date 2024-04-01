import request from "supertest";
import HTTPAdapter from "../../../../src/adapters/HTTPAdapter/protocol";
import { IBook } from "../../../../src/entities/Book";
import { IUser } from "../../../../src/entities/User";

describe('## DELETE ##', () => {

    let app: any;
    let userId: string;
    let book_Id: string;
    let reservationId: string;
    let tokenUser: string;
    let tokenAdmin: string;


    beforeAll(async () => {

        HTTPAdapter.config()
        app = HTTPAdapter.getApp()

        const book: IBook = {
            title: "Route delete a reserve",
            synopsis: "Um copo meio cheio, mas que sabe ele está cheio",
            price: 80,
            author: "Route Delete",
            pageCount: 23,
            publishedDate: '2024-10-09',
            genre: "Route"
        }

        const user: IUser = {
            username: "deletereserve",
            email: "deletereserve@gmail.com",
            password: "123.cB",
            telephone: "46642658800"
        }

        await request(app)
            .post("/v1/users/login")
            .send({
                email: "admin_teste@gmail.com",
                password: "123.aB",
            })
            .expect(200)
            .then(response => {

                const tokenJSONAdmin = response.body;
                expect(tokenJSONAdmin).toHaveProperty('token');
                tokenAdmin = tokenJSONAdmin.token;

            })


        await request(app)
            .post(`/v1/book/add`)
            .set('Authorization', `${tokenAdmin}`)
            .send(book)
            .expect(200)
            .then(response => {

                const bookProps = response.body;
                expect(bookProps).toHaveProperty('id');
                book_Id = bookProps.id;

            })

        await request(app)
            .post('/v1/users/signIn')
            .send(user)
            .expect(200)
            .then(response => {

                const userSignIn = response.body;
                expect(userSignIn.user).toHaveProperty('id');
                userId = userSignIn.user.id;

            })

        await request(app)
            .post("/v1/users/login")
            .send({
                email: "deletereserve@gmail.com",
                password: "123.cB",
            })
            .expect(200)
            .then(response => {

                const tokenJSONUser = response.body;
                expect(tokenJSONUser).toHaveProperty('token');
                tokenUser = tokenJSONUser.token;

            })
        
        await request(app)
            .post(`/v1/reservation/user/${userId}/book/${book_Id}`)
            .set('Authorization', `${tokenUser}`)
            .expect(200)
            .then(response => {
                
                expect(response.body).toHaveProperty('id');
                reservationId = response.body.id

            })

    })

    it("Deve deletar a reserva", async () => {

        await request(app)
            .delete(`/v1/reservation/delete/${reservationId}`)
            .set('Authorization', `${tokenUser}`)
            .expect(200)
            .then(response => {

                expect(response.body.message).toEqual("Reservation deleted successfully.");

            })
        
    })

    it("Deve tentar deletar reserva com id inexistente", async () => {

        await request(app)
            .delete(`/v1/reservation/delete/${reservationId}`)
            .set('Authorization', `${tokenUser}`)
            .expect(404)
            .then(response => {

                expect(response.body.message).toEqual('Unable to perform update operation. The specified column cannot be modified as it is either part of the primary key, marked as read-only, or automatically generated.');

            })
        
    })

    it("Deve tentar deletar reserva sem token", async () => {

        await request(app)
            .delete(`/v1/reservation/delete/${reservationId}`)
            .expect(401)
            .then(response => {

                expect(response.body.message).toEqual('Must have an authorization token');

            })
        
    })

    afterAll(async () => {

        HTTPAdapter.close()

    })

})