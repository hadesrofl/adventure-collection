import { SystemSeedData } from "@app/api/_internal/shared/db/seeding/data/seedSystems";
import { System } from "@domain/models/system";

export const mockSystemSeeds: SystemSeedData[] = [
  { name: "Dungeon Crawl Classics" },
  { name: "Mausritter" },
];

export const mockSystems: System[] = mockSystemSeeds.map((seed, idx) => {
  return { id: idx + 1, name: seed.name, createdAt: new Date() };
});
