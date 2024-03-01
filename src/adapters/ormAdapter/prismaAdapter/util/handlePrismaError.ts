import { Prisma } from "@prisma/client";

export const handlePrismaError = (error: any): string => {
    switch(true) {
        case error instanceof Prisma.PrismaClientValidationError:
            return "Invalid input type."

        case error instanceof Prisma.PrismaClientKnownRequestError:
            return "Id does not exist."

        default:
           return "Internal server error. Try again later."
    }
};

export default handlePrismaError;
