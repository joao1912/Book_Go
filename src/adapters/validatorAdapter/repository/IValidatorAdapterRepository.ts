import { ZodObject, ZodRawShape } from "zod";
import { userSchema } from "../../../entities/User";

export enum SchemaKey {
    user = "user",
}

export const schemaMap: Record<SchemaKey, ZodObject<ZodRawShape>> = {
    [SchemaKey.user]: userSchema,
};

export interface IValidatorAdapterRepository {

    validateSchema<T>(data: T, schemaKey: SchemaKey): T

}

