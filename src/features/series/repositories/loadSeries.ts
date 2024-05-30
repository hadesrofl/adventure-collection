"use server";
import dbContext from "@repositories/dbContext";

export async function loadSeries(where: object, skip?: number, limit?: number) {
  const series = await dbContext.series.list(where, skip, limit);
  return series;
}
