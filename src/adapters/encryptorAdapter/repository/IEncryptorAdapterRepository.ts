
export interface IEncryptorAdapterRepository {

    hash(password: string): string

    validadePassword(password: string, hash: string): Promise<boolean>

}