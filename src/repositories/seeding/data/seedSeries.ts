import { SeriesFull } from "@features/series";
import { createIfNotExists, readJsonFile } from "../helper/seedHelper";
import { SeriesRepository } from "@features/series";
import { System } from "@features/systems";

export interface SeriesSeedData {
  name: string;
  system: string;
}

function findSystem(name: string, systems: System[]) {
  const system = systems.find(
    (system) => system.name.toLowerCase() === name.toLowerCase()
  );

  if (system === undefined)
    throw new Error(
      `System '${name}' not found in database. Run seeding of systems first!`
    );
  return system;
}

function createSeries(
  seriesData: SeriesSeedData,
  systems: System[]
): SeriesFull {
  const system = findSystem(seriesData.system, systems);
  return {
    id: 0,
    name: seriesData.name,
    adventures: [],
    createdAt: new Date(Date.now()),
    system,
    systemId: system.id,
  };
}

function getSeriesData(systems: System[]) {
  const seriesData = readJsonFile<SeriesSeedData[]>(
    `${process.env.SEED_DATA_DIR}/series.json`
  );
  if (seriesData === undefined) return [];
  return seriesData.map((series) => createSeries(series, systems));
}

export async function seedSeries(
  seedRepository: SeriesRepository,
  systems: System[]
) {
  console.log("Seeding Series...");
  const seedData = getSeriesData(systems);
  let dataCount = 0;
  for (let i = 0; i < seedData.length; i += 1) {
    const series = seedData[i];
    const where = {
      name: series.name,
    };
    if (await createIfNotExists(series, seedRepository, where)) dataCount++;
  }
  console.log(`Series inserted: ${dataCount}`);
}
