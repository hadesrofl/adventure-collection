import prismaClient from "./prisma";
import AdventureRepository from "../../adventures/db/AdventureRepository";
import GenreRepository from "../../genre/db/GenreRepository";
import SeriesRepository from "../../series/db/SeriesRepository";
import { SystemRepository } from "../../system/db/systemRepository";

export type DbContext = {
  adventures: AdventureRepository;
  systems: SystemRepository;
  series: SeriesRepository;
  genres: GenreRepository;
};

const adventures = new AdventureRepository(prismaClient);
const systems = new SystemRepository(prismaClient, adventures);
const series = new SeriesRepository(prismaClient);
const genres = new GenreRepository(prismaClient, adventures);

const dbContext: DbContext = {
  adventures,
  systems,
  series,
  genres,
};

export default dbContext;
