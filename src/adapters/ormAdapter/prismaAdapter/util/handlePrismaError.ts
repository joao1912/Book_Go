import { Prisma } from "@prisma/client";

export const handlePrismaError = (error: any): string => {
    switch (true) {

        case error instanceof Prisma.PrismaClientValidationError:

            return ("Invalid input type provided.")
            
        case error instanceof Prisma.PrismaClientKnownRequestError:
            const meta = error.meta

            if (error.code === "P2002" && meta) {
                const target = meta.target
                return (`This ${target} is already in use.`);
            }

            if (error.code === "P2025") {

                return ("Id provided does not exist.")
            }

        default:
            console.log(error)
            return "Internal server error. Try again later."
    }
};

export default handlePrismaError;
