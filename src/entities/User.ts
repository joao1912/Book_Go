import { ZodType, z } from "zod"

export interface IUser {
    id?: string;
    username: string;
    password: string;
    email: string;
    telephone: string;
    favoritesBooks?: number[];
}

export const userSchema = z.object({
    id: z.string().optional(),

    username: z.string()
        .min(3, { message: "Username must be at least 3 characters in length." })

        .max(40, { message: "Username must be a maximum of 40 characters in length." })
        .regex(/^[A-Za-záàâãäéèêëíìîïóòôõöúùûüçÁÀÂÃÄÉÈÊËÍÌÎÏÓÒÔÕÖÚÙÛÜÇ--][A-Za-z0-9_ ]*$/
        , { message: "Username must start with an alphabet." }),

    password: z.string()
        .min(6, { message: "Password must be at least 6 characters in length." })
        .max(25, { message: "Password must be a maximum of 25 characters in length." })
        .regex(/.*[A-Z].*/, { message: "Password must contain at least one uppercase character." })
        .regex(/.*[a-z].*/, { message: "Password must contain at least one lowercase character." })
        .regex(/.*[0-9].*/, { message: "Password must contain at least one number." })
        .regex(/[@#*\-_.]/, { message: `Password must contain at least one of these special characters: "#@%*&-."` }),

    email: z.string().email()
        .max(40, { message: 'Email must be a maximum of 40 characters in length.' }),

    telephone: z.string(),
    // .regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,  { message: 'Please enter a valid telephone number.' }),

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