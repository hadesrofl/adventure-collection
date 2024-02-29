"use server";
import prismaClient from "@app/api/_internal/shared/db/prisma";
import { seedAdventures } from "@app/api/_internal/shared/db/seeding/data/seedAdventures";
import { seedGenres } from "@app/api/_internal/shared/db/seeding/data/seedGenres";
import { seedSystems } from "@app/api/_internal/shared/db/seeding/data/seedSystems";
import dbContext from "@app/api/_internal/shared/db/dbContext";
import { seedSeries } from "@app/api/_internal/shared/db/seeding/data/seedSeries";

export async function startSeeding() {
  if (process.env.DATABASE_SEED_DATA !== "true") return;

  console.log("--- Begin Seeding ---");
  await seedSystems(dbContext.systems);
  await seedGenres(dbContext.genres);
  const systems = await prismaClient.system.findMany();
  const genres = await prismaClient.genre.findMany();
  await seedSeries(dbContext.series, systems);
  const series = await prismaClient.series.findMany();
  await seedAdventures(dbContext.adventures, systems, genres, series);
  console.log("---- Done Seeding ---");
}
