import { Prisma } from "@prisma/client";
import ServerResponse from "../../../../interface/controllers/utils/ServerResponse";

export const handlePrismaError = (error: any): string => {
    
    switch (true) {

        case error instanceof Prisma.PrismaClientValidationError:

        throw ServerResponse.badRequest ("Invalid input type provided.")
            
        case error instanceof Prisma.PrismaClientKnownRequestError:
            const meta = error.meta

            if (error.code === "P2002" && meta) {
                const target = meta.target
                throw ServerResponse.conflict (`This ${target} is already in use.`);
            }

            if (error.code === "P2025") {

                throw ServerResponse.notFound ("Id provided does not exist.")
            }

        default:
            console.log(error)
            throw ServerResponse.serviceUnavailable("The database is currently unavailable. Please try again later.")
    }
};

export default handlePrismaError;
