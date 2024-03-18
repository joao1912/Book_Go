import ServerResponse from "../../interface/controllers/utils/ServerResponse";
import { IValidatorAdapterRepository, returnData } from "./repository/IValidatorAdapterRepository";
import { ZodObject, ZodRawShape } from "zod";

export class ZodAdapter implements IValidatorAdapterRepository {

    validate<T, S extends ZodObject<ZodRawShape>>(data: T, schema: S): Partial<returnData<T>> {

        const result = schema.safeParse(data)

        const returnValues = {
            success: result.success,
            data: result.success ? result.data : result.error.message
        }

        if (!result.success) {

            const errors = result.error.issues

            // versao mais simples: result.error.format()

            ServerResponse.badRequest('ValidatorError', JSON.stringify(errors))

        }

        return returnValues

    }

}
