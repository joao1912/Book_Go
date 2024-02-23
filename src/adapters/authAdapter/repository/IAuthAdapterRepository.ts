
export interface IAuthAdapterRepository {

    sign(id: string): string | undefined

    checkToken(token: string): string | null

    getAuth(): any

}