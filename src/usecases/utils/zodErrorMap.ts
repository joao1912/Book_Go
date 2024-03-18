import { CustomError } from "../../interface/controllers/utils/CustomError";
import ServerResponse from "../../interface/controllers/utils/ServerResponse";
import { z } from "zod";

const zodErrorMap: z.ZodErrorMap = (error, ctx) => {
    /*
    This is where you override the various error codes
    */
    switch (error.code) {
      case z.ZodIssueCode.invalid_type:
        ServerResponse.badRequest ("", `Field: ${error.path}. ${error.message}`)

        break;
        
      case z.ZodIssueCode.custom:
        // produce a custom message using error.params
        // error.params won't be set unless you passed
        // a `params` arguments into a custom validator
        const params = error.params || {};
        if (params.myField) {
          return { message: `Bad input: ${params.myField}` };
        }
        break;
    }
  
    // fall back to default message!
    return { message: ctx.defaultError };
  };

z.setErrorMap(zodErrorMap);

export default zodErrorMap
