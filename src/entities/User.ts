import { ZodType, z } from "zod"

export interface IUser  {
    id?: string;
    username: string;
    password: string;
    email: string ;
    telephone: string;
    favoritesBooks?: number[];
} 

export const userSchema = z.object({
    id: z.string().optional(),
    username: z.string().max(40, { message: 'O nome pode ter no maximo 40 caracteres.' }),
    password: z.string().min(6, { message: 'A Senha precisa de no minimo 6 caracteres.' }),
    email: z.string().email().max(40, { message: 'O email pode ter no maximo 40 caracteres.' }),
    telephone: z.string(),
    favoritesBooks: z.array(z.number()).optional()
}) satisfies ZodType<IUser>

export class User {

    readonly props: IUser

    constructor(props: IUser) {

        const { id, username, password, email, telephone, favoritesBooks = [] } = props
        this.props = props


    }


    get User() {
        return {
            id: this.props.id,
            username: this.props.username,
            password: this.props.password,
            email: this.props.email,
            telephone: this.props.telephone,
        }
    }


}