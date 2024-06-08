import { SystemFull, SystemRepository } from "@features/systems";
import {
  createIfNotExists,
  readJsonFile,
} from "@repositories/seeding/helper/seedHelper";

export interface SystemSeedData {
  name: string;
}

function createSystem(name: string): SystemFull {
  return {
    id: 0,
    name,
    adventures: [],
    createdAt: new Date(Date.now()),
  };
}

function getSystemData() {
  const systemData = readJsonFile<SystemSeedData[]>(
    `${process.env.SEED_DATA_DIR}/systems.json`
  );
  if (systemData === undefined) return [];
  return systemData.map((system) => createSystem(system.name));
}

export async function seedSystems(seedRepository: SystemRepository) {
  console.log("Seeding Systems...");
  const seedData = getSystemData();
  let dataCount = 0;
  for (let i = 0; i < seedData.length; i += 1) {
    const system = seedData[i];
    const where = {
      name: system.name,
    };
    if (await createIfNotExists(system, seedRepository, where)) dataCount++;
  }
  console.log(`Systems inserted: ${dataCount}`);
}
