
export interface IValidatorAdapterRepository {

    validateSchema<T, S>(data: T, schema: any): S

}

