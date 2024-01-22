export interface IUser {
    id: String
    username: String
    password: String
    contact: Icontact
}

export interface Icontact {
    email: String
    telephone: String
}

export class User {
    
    readonly id: String
    readonly username: String
    readonly password: String
    readonly email: String
    readonly telephone: String

    constructor(id: String, username: String, email: String, telephone: String, password: String) {
        this.id = id
        this.username = username
        this.email = email
        this.telephone = telephone
        this.password = password
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