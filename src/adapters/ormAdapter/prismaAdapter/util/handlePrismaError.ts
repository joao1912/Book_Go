import { Prisma } from "@prisma/client";
import ServerResponse from "../../../../interface/controllers/utils/ServerResponse";


export const handlePrismaError = (name: string, error: any): never => {
    
    switch (true) {

        case error instanceof Prisma.PrismaClientValidationError:

            ServerResponse.badRequest (name, "Invalid input type provided.")
            

        case error instanceof Prisma.PrismaClientKnownRequestError:
            const meta = error.meta

            if (error.code === "P2002" && meta) {
                const target = meta.target
                ServerResponse.conflict (name, `This ${target} is already in use.`);
            }

            if (error.code === "P2025") {

                ServerResponse.notFound (name, "Id provided does not exist.")
            }
            

        default:
            console.log(error)
            ServerResponse.serviceUnavailable(name, "The database is currently unavailable. Please try again later.")
    }
};

export default handlePrismaError;
