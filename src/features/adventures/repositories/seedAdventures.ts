import { Series } from "@features/series";
import { System } from "@features/systems";
import { Genre } from "@prisma/client";
import { Repository } from "@repositories/BaseRepository";
import {
  createIfNotExists,
  readJsonFile,
} from "@repositories/seeding/helper/seedHelper";
import { Languages } from "@domain/models/languages";
import { AdventureFull } from "../types/adventure";
import { buildAdventure } from "../types/factories/AdventureFactory";

export interface AdventureSeedData {
  name: string;
  summary: string;
  tags: string[];
  system: string;
  genres: string[];
  language: Languages;
  image?: string;
  pageCount?: number;
  minLevel?: number;
  maxLevel?: number;
  series?: string;
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

function findGenre(name: string, genres: Genre[]) {
  const genre = genres.find(
    (genre) => genre.name.toLowerCase() === name.toLowerCase()
  );
  if (genre === undefined)
    throw new Error(
      `Genre '${name}' not found in database. Run seeding of genres first!`
    );
  return genre;
}

function findSeries(name: string, series: Series[]) {
  const adventureSeries = series.find(
    (series) => series.name.toLowerCase() === name.toLowerCase()
  );
  if (adventureSeries === undefined)
    throw new Error(
      `Series '${name}' not found in database. Run seeding of series first!`
    );
  return adventureSeries;
}

function getAdventureData(
  systems: System[],
  genres: Genre[],
  series: Series[]
): AdventureFull[] {
  const adventureData = readJsonFile<AdventureSeedData[]>(
    `${process.env.SEED_DATA_DIR}/adventures.json`
  );
  if (adventureData === undefined) return [];

  return adventureData.map((adventure) => {
    const system = findSystem(adventure.system, systems);
    const adventureGenres = adventure.genres.map((genreName) =>
      findGenre(genreName, genres)
    );
    const adventureSeries =
      adventure.series !== undefined
        ? findSeries(adventure.series, series)
        : undefined;
    return buildAdventure(
      adventure.name,
      adventure.summary,
      system.id,
      system,
      adventureGenres,
      adventure.tags.map((tag) => {
        return { id: 0, name: tag, createdAt: new Date(Date.now()) };
      }),
      adventure.language,
      adventure.image,
      adventure.pageCount,
      adventure.minLevel,
      adventure.maxLevel,
      adventureSeries
    );
  });
}

export async function seedAdventures(
  seedRepository: Repository<AdventureFull>,
  systems: System[],
  genres: Genre[],
  series: Series[]
) {
  console.log("Seeding Adventures...");
  const seedData = getAdventureData(systems, genres, series);
  let dataCount = 0;
  for (let i = 0; i < seedData.length; i += 1) {
    const adventure = seedData[i];
    const where = {
      name: adventure.name,
      summary: adventure.summary,
    };
    if (await createIfNotExists(adventure, seedRepository, where)) dataCount++;
  }
  console.log(`Adventures inserted: ${dataCount}`);
}
