"use server";
import prismaClient from "@repositories/prisma";
import dbContext from "@repositories/dbContext";
import { seedGenres } from "@repositories/seeding/data/seedGenres";
import { seedSeries } from "@repositories/seeding/data/seedSeries";
import { seedAdventures } from "@features/adventures";
import { seedSystems } from "@repositories/seeding/data/seedSystems";

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
