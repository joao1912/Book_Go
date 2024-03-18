export enum SchemaKey {
    user = "user",
}

export interface IValidatorAdapterRepository {

    validateSchema<T>(data: T, schemaKey: SchemaKey): T

}

