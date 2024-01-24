
export interface IDeleteUser {
    execute(id: String): Promise<void>
}