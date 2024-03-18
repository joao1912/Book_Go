export enum SchemaKey {
    user = "user",
    book = "book",
    comment = "comment"
}

export interface IValidatorAdapterRepository {

    validateSchema<T>(data: T, schemaKey: SchemaKey): T

}

