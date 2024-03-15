import { Prisma } from "@prisma/client";
import { CustomError } from "../../../../interface/controllers/utils/CustomError";

export const handlePrismaError = (name: string, error: any): string => {
    
    switch (true) {

        case error instanceof Prisma.PrismaClientValidationError:

        throw CustomError.badRequest (name, "Invalid input type provided.")
            
        case error instanceof Prisma.PrismaClientKnownRequestError:
            const meta = error.meta

            if (error.code === "P2002" && meta) {
                const target = meta.target
                throw CustomError.conflict (name, `This ${target} is already in use.`);
            }

            if (error.code === "P2025") {

                throw CustomError.notFound (name, "Id provided does not exist.")
            }

        default:
            console.log(error)
            throw CustomError.serviceUnavailable(name, "The database is currently unavailable. Please try again later.")
    }
};

export default handlePrismaError;
