import HTTPAdapter from "../../../../src/adapters/HTTPAdapter/protocol";
import { IUser } from "../../../../src/entities/User";
import request from "supertest";

describe('## DELETE ##', () => {

    let token: string;
    let app: any;
    let user: IUser;

    beforeAll(async () => {

        HTTPAdapter.config()
        app = HTTPAdapter.getApp()

        user = {
            email: 'userToDeleteUserTest@teste.com',
            password: 'umaSenhaParaTeste',
            telephone: '02101201212',
            username: 'userToDeleteUserTest',
        }

        await request(app)
            .post('/v1/users/signIn')
            .send(user)
            .expect(200)
            .then(response => {

                token = response.body.token;

            })

    })

    it('Deve deletar os dados de um usuário', async () => {

        await request(app)
        .delete('/v1/users/deleteUser/')
        .set('Authorization', token)
        .expect(200)

    })

})