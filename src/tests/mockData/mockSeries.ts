import { SeriesSeedData } from "@app/api/_internal/shared/db/seeding/data/seedSeries";
import { Series, SeriesFull } from "@domain/models/series";
import { mockSystems } from "./mockSystems";
import { mockAdventures } from "./mockAdventures";

function createSeries(seed: SeriesSeedData, idx: number) {
  const system = getSystem(seed);
  return {
    id: idx + 1,
    name: seed.name,
    createdAt: new Date(),
    systemId: system.id,
  };
}

function getSystem(seed: SeriesSeedData) {
  const lastSystemId = mockSystems[mockSystems.length - 1].id;
  const system = mockSystems.find((system) => system.name === seed.system) ?? {
    id: lastSystemId + 1,
    name: seed.system,
    createdAt: new Date(),
  };
  return system;
}

export const mockSeriesSeeds: SeriesSeedData[] = [
  { name: "DCC Trichter", system: "Dungeon Crawl Classics" },
  { name: "Weihnachtsabenteuer", system: "Mausritter" },
];

export const mockSeries: Series[] = mockSeriesSeeds.map((seed, idx) => {
  return createSeries(seed, idx);
});

export const mockFullSeries: SeriesFull[] = mockSeriesSeeds.map((seed, idx) => {
  return {
    ...createSeries(seed, idx),
    system: getSystem(seed),
    adventures: [mockAdventures[0]],
  };
});
