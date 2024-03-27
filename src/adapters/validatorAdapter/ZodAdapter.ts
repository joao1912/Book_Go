import { authorSchema } from "../../entities/Author";
import { bookSchema } from "../../entities/Book";
import { commentSchema } from "../../entities/Comment";
import { financeSchema } from "../../entities/Finance";
import { reservationSchema } from "../../entities/Reservation";
import { stockSchema } from "../../entities/Stock";
import { userSchema } from "../../entities/User";
import { CustomError } from "../../interface/controllers/utils/CustomError";
import ServerResponse from "../../interface/controllers/utils/ServerResponse";
import { IValidatorAdapterRepository, SchemaKey } from "./repository/IValidatorAdapterRepository";
import { ZodObject, ZodRawShape, z } from "zod";

export const schemaMap: Record<SchemaKey, ZodObject<ZodRawShape>> = {
    [SchemaKey.user]: userSchema,
    [SchemaKey.comment]: commentSchema,
    [SchemaKey.book]: bookSchema,
    [SchemaKey.author]: authorSchema,
    [SchemaKey.finance]: financeSchema,
    [SchemaKey.reservation]: reservationSchema,
    [SchemaKey.stock]: stockSchema
};

export class ZodAdapter implements IValidatorAdapterRepository {

    validateSchema<T>(data: T, schemaKey: SchemaKey): T {

        const schema = schemaMap[schemaKey];

        const result = schema.safeParse(data)

        if (!result.success) {

            const errors = result.error.issues

            throw new CustomError('ValidatorError', JSON.stringify(errors), 400);

        } else {

            const validData = result.data as T
            
            return validData 
            
        }

    }

    validatePartial<T extends object>(data: T, schemaKey: SchemaKey): T {

        const schema = schemaMap[schemaKey];

        const propsSchema: string[] = Object.keys({ ...schema.shape });

        for (let propSchema of propsSchema) {

            for (let propData in data) {

                if (propSchema === propData) {

                    return data

                }

            }

        }

        ServerResponse.badRequest('ValidatorError', 'No valid properties were sent.')

    }

    validateId(id: string | undefined): string {

        const idZod = z.string().uuid({message: 'Invalid ID provided.'})

        const result = idZod.safeParse(id)

        if (!result.success) {

            ServerResponse.badRequest('ValidatorError', JSON.stringify(result.error.issues))

        } else {

            return result.data

        }

    }

}
 