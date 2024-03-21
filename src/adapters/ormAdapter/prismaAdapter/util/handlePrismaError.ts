import { Prisma } from "@prisma/client";
import ServerResponse from "../../../../interface/controllers/utils/ServerResponse";
import { CustomError } from "../../../../interface/controllers/utils/CustomError";


export const handlePrismaError = (name: string, error: any) => {

    switch (true) {

        case error instanceof Prisma.PrismaClientValidationError:

            ServerResponse.badRequest(name, "Invalid input type provided.")

        case error instanceof Prisma.PrismaClientInitializationError:
            ServerResponse.serviceUnavailable(name, "The database is currently unavailable. Please try again later.")

        case error instanceof Prisma.PrismaClientUnknownRequestError:
            console.log(error)
            ServerResponse.serviceUnavailable(name, "We don't know what happened. Try again later...")

        case error instanceof Prisma.PrismaClientRustPanicError:
            console.log(error, error.message)
            ServerResponse.serviceUnavailable(name, "We don't know what happened. Try again later")


        case error instanceof Prisma.PrismaClientKnownRequestError:
           
            const meta = error.meta

            if (error.code === "P2002" && meta) {
                const target = meta.target
                ServerResponse.conflict(name, `This ${target} is already in use.`);
            }

            if (error.code === "P2025") {

                ServerResponse.notFound(name, "Id provided does not exist.")
            }
            

        default:

            if (error instanceof CustomError) {

                throw error
                  
            }

            ServerResponse.notFound(name, "No results.")
    }
};

export default handlePrismaError;
