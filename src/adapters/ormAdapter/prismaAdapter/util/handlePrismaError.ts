import { Prisma } from "@prisma/client";

export const handlePrismaError = (error: any): string => {
    switch (true) {
        case error instanceof Prisma.PrismaClientValidationError:
            return "Invalid input type provided."

        case error instanceof Prisma.PrismaClientKnownRequestError:
     
                // console.log(error.meta)

            return "Id provided does not exist."
            //unique constraint P2002


        default:
            console.log(error)
            return "Internal server error. Try again later."
    }
};

export default handlePrismaError;
