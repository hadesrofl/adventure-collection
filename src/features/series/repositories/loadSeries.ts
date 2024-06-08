"use server";
import { seriesRepository } from "./SeriesRepository";

export async function loadSeries(where: object, skip?: number, limit?: number) {
  const series = await seriesRepository.list(where, skip, limit);
  return series;
}
