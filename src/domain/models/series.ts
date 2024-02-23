import { Prisma } from "@prisma/client";

export const seriesIncludes = {
  adventures: true,
};

export type Series = Prisma.SeriesGetPayload<{}>;

export type SeriesFull = Prisma.SeriesGetPayload<{
  include: { adventures: true };
}>;
