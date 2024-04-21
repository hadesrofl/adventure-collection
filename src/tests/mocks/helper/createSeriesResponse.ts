import { Series, SeriesFull, isSeriesFull } from "@domain/models/series";
import { createAdventureResponse } from "./createAdventureResponse";

export function createSeriesResponse(series: Series | SeriesFull) {
  if (isSeriesFull(series)) {
    return {
      ...createResponse(series),
      adventures: series.adventures.map((adventure) => {
        return createAdventureResponse(adventure);
      }),
      system: {
        ...series.system,
        createdAt: "" + series.system.createdAt.toISOString() + "",
      },
    };
  } else {
    return createResponse(series);
  }
}

function createResponse(series: Series | SeriesFull) {
  return {
    ...series,
    createdAt: "" + series.createdAt.toISOString() + "",
  };
}
