import { SeriesSeedData } from "@app/api/_internal/shared/db/seeding/data/seedSeries";
import { Series } from "@domain/models/series";
import { mockSystems } from "./mockSystems";

export const mockSeriesSeeds: SeriesSeedData[] = [
  { name: "DCC Trichter", system: "Dungeon Crawl Classics" },
  { name: "Weihnachtsabenteuer", system: "Mausritter" },
];

export const mockSeries: Series[] = mockSeriesSeeds.map((seed, idx) => {
  const lastSystemId = mockSystems[mockSystems.length - 1].id;
  const system = mockSystems.find((system) => system.name === seed.system) ?? {
    id: lastSystemId + 1,
    name: seed.system,
    createdAt: new Date(),
  };
  return {
    id: idx + 1,
    name: seed.name,
    createdAt: new Date(),
    systemId: system.id,
  };
});
