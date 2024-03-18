import { CustomError } from "../../interface/controllers/utils/CustomError";
import ServerResponse from "../../interface/controllers/utils/ServerResponse";
import { IValidatorAdapterRepository } from "./repository/IValidatorAdapterRepository";
import { ZodObject, ZodRawShape, z } from "zod";

export class ZodAdapter implements IValidatorAdapterRepository {

    validateSchema<T, S>(data: T, schema: ZodObject<ZodRawShape>): S {

        const result = schema.safeParse(data)

        if (!result.success) {

            const errors = result.error.issues

            // versao mais simples: result.error.format()

            throw new CustomError('ValidatorError', JSON.stringify(errors), 400);

        } else {

            const validData = result.data as S
            
            return validData 
            
        }

    }

    validateId(id: string | undefined): string {

        const idZod = z.string().uuid({message: 'O id está inválido'})

        const result = idZod.safeParse(id)

        if (!result.success) {

            ServerResponse.badRequest('ValidatorError', JSON.stringify(result.error.issues))

        } else {

            return result.data

        }

    }

}
 