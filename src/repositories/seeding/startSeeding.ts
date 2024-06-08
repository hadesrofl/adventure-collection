"use server";
import prismaClient from "@repositories/prisma";
import { seedGenres } from "@repositories/seeding/data/seedGenres";
import { seedSeries } from "@repositories/seeding/data/seedSeries";
import { seedAdventures } from "@features/adventures";
import { seedSystems } from "@repositories/seeding/data/seedSystems";
import { systemRepository } from "@features/systems";
import { genreRepository } from "@features/genres";
import { seriesRepository } from "@features/series";
import { adventureRepository } from "@features/adventures/repositoryExports";

export async function startSeeding() {
  if (process.env.DATABASE_SEED_DATA !== "true") return;

  console.log("--- Begin Seeding ---");
  await seedSystems(systemRepository);
  await seedGenres(genreRepository);
  const systems = await prismaClient.system.findMany();
  const genres = await prismaClient.genre.findMany();
  await seedSeries(seriesRepository, systems);
  const series = await prismaClient.series.findMany();
  await seedAdventures(adventureRepository, systems, genres, series);
  console.log("---- Done Seeding ---");
}
