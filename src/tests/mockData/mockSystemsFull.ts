import { SystemFull } from "@features/systems";
import { SystemSeedData } from "@repositories/seeding/data/seedSystems";
import { mockAdventures } from "./mockAdventures";
import { mockSystemSeeds } from "./mockSystems";

function createSystem(seed: SystemSeedData, idx: number) {
  return {
    id: idx + 1,
    name: seed.name,
    createdAt: new Date(),
  };
}

export const mockFullSystems: SystemFull[] = mockSystemSeeds.map(
  (seed, idx) => {
    return {
      ...createSystem(seed, idx),
      adventures: [
        ...mockAdventures.filter(
          (adventure) => adventure.system.name === seed.name
        ),
      ],
    };
  }
);
