import { Series, SeriesFull, seriesIncludes } from "@features/series";
import { Adventure } from "@prisma/client";

export function buildSeriesDbStatement(
  series: Series | SeriesFull,
  connectAdventures?: Adventure[],
  disconnectAdventures?: Adventure[]
) {
  return {
    data: {
      ...series,
      adventures: {
        connect: connectAdventures?.map((adventure) => {
          return { id: adventure.id };
        }),
        disconnect: disconnectAdventures?.map((adventure) => {
          return { id: adventure.id };
        }),
      },
      system: undefined,
    },
    include: seriesIncludes,
  };
}
