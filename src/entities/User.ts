export interface IUser  {
    id?: string
    username: string
    password: string
    email: string 
    telephone: string
    favoritesBooks?: number[]
}


export class User {
    
    readonly props: IUser


    constructor(props: IUser) {
     
      const  {id, username,  password, email, telephone, favoritesBooks = []} = props
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