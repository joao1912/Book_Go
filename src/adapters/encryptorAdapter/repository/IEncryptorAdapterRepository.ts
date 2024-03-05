
export interface IEncryptorAdapterRepository {

    hash(password: string): string

    validatePassword(password: string, hash: string): Promise<boolean>

}