export interface IUser  {
    id: string
    username: string
    password: string
    email: string 
    telephone: string
}


export class User {
    
    readonly id: string
    readonly username: string
    readonly password: string
    readonly email: string
    readonly telephone: string
    readonly favoritesBooks: number[]

    constructor(id: string, username: string, email: string, telephone: string, password: string, favoritesBooks = []) {
        this.id = id
        this.username = username
        this.email = email
        this.telephone = telephone
        this.password = password
        this.favoritesBooks = favoritesBooks
    }

    getUser() {
        return {
            id: this.id,
            username: this.username,
            password: this.password
        }
    }

    getContacts() {
        return {
            telephone: this.telephone,
            email: this.email,
        }
    }

}