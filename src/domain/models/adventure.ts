import { Prisma } from "@prisma/client";

export const adventureIncludes = {
  tags: true,
  system: true,
  genres: true,
  series: true,
};

export type Adventure = Prisma.AdventureGetPayload<{}>;

export type AdventureFull = Prisma.AdventureGetPayload<{
  include: { tags: true; system: true; genres: true; series: true };
}>;
