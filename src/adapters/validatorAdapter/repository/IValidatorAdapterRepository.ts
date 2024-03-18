
export interface IValidatorAdapterRepository {

    validate<T, S>(data: T, schema: any): S

}

