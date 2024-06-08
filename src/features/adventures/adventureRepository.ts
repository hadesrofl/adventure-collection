import prismaClient from "@repositories/prisma";
import AdventureRepository from "./repositories/AdventureRepository";

export const adventureRepository = new AdventureRepository(prismaClient);
