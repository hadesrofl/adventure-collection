import { Prisma } from "@prisma/client";

export const seriesIncludes = {
  adventures: true,
  system: true,
};

export type Series = Prisma.SeriesGetPayload<object>;

export type SeriesFull = Prisma.SeriesGetPayload<{
  include: { adventures: true; system: true };
}>;

export function isSeriesFull(series: unknown): series is SeriesFull {
  return (series as SeriesFull).system !== undefined;
}
