import prismaClient from "./prisma";
import AdventureRepository from "../../adventures/db/AdventureRepository";
import GenreRepository from "../../genre/db/GenreRepository";
import SeriesRepository from "../../series/db/SeriesRepository";
import { SystemRepository } from "../../system/db/systemRepository";
import { TagRepository } from "../../tags/db/TagRepository";

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
