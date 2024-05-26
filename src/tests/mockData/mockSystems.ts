import { System } from "@features/systems/";
import { SystemSeedData } from "@repositories/seeding/data/seedSystems";

export const mockSystemSeeds: SystemSeedData[] = [
  { name: "Dungeon Crawl Classics" },
  { name: "Mausritter" },
];

export const mockSystems: System[] = mockSystemSeeds.map((seed, idx) => {
  return { id: idx + 1, name: seed.name, createdAt: new Date() };
});
