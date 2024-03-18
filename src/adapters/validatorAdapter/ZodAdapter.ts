import { CustomError } from "../../interface/controllers/utils/CustomError";
import { IValidatorAdapterRepository } from "./repository/IValidatorAdapterRepository";
import { ZodObject, ZodRawShape } from "zod";

export class ZodAdapter implements IValidatorAdapterRepository {

    validate<T, S>(data: T, schema: ZodObject<ZodRawShape>): S {

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

}
