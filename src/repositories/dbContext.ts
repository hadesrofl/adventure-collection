import prismaClient from "./prisma";
import { GenreRepository } from "@features/genres";
import { SeriesRepository } from "@features/series";
import { TagRepository } from "@features/tags";
// eslint-disable-next-line no-restricted-imports
import AdventureRepository from "@features/adventures/repositories/AdventureRepository";
// eslint-disable-next-line no-restricted-imports
import { SystemRepository } from "@features/systems/repositories/systemRepository";

export type DbContext = {
  adventures: AdventureRepository;
  systems: SystemRepository;
  series: SeriesRepository;
  genres: GenreRepository;
  tags: TagRepository;
};

const adventures = new AdventureRepository(prismaClient);
const systems = new SystemRepository(prismaClient, adventures);
const series = new SeriesRepository(prismaClient, adventures);
const genres = new GenreRepository(prismaClient, adventures);
const tags = new TagRepository(prismaClient);

const dbContext: DbContext = {
  adventures,
  systems,
  series,
  genres,
  tags,
};

export default dbContext;
