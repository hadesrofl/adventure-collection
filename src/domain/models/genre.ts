import { Prisma } from "@prisma/client";

export const genreIncludes = {
  adventures: true,
  children: true,
  parent: true,
};

export type Genre = Prisma.GenreGetPayload<{}>;

export type GenreFull = Prisma.GenreGetPayload<{
  include: { adventures: true; children: true; parent: true };
}>;
