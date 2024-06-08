import { SeriesRepository } from "@features/series";
import { mockSeries, mockSeriesSeeds } from "@tests/mockData/mockSeries";
import { prismaMock } from "@tests/setup/prisma";
import { fsReadFileSyncMock } from "@tests/mocks/fs";
import { seedSeries } from "./seedSeries";
import { logSpy } from "@tests/mocks/consoleLog";
import { mockSystems } from "@tests/mockData/mockSystems";
import { AdventureRepository } from "@features/adventures/repositoryExports";

function mockContentOfImportingFile() {
  fsReadFileSyncMock.mockReturnValueOnce(JSON.stringify(mockSeriesSeeds));
}

describe("Seed Series", () => {
  const repository = new SeriesRepository(
    prismaMock,
    new AdventureRepository(prismaMock)
  );

  beforeEach(() => {
    process.env = {
      ...process.env,
      SEED_DATA_DIR: undefined,
    };
  });

  it("imports seeds", async () => {
    mockContentOfImportingFile();

    prismaMock.series.findMany.mockResolvedValue([]);
    prismaMock.series.create
      .mockResolvedValueOnce(mockSeries[0])
      .mockResolvedValueOnce(mockSeries[1]);

    await seedSeries(repository, mockSystems);

    [
      "Seeding Series...",
      mockSeries[0],
      mockSeries[1],
      "Series inserted: 2",
    ].forEach((text) => expect(logSpy).toHaveBeenCalledWith(text));
    expect(prismaMock.series.create).toHaveBeenCalledTimes(2);
    expect(logSpy).toHaveBeenCalledTimes(4);
  });

  it("imports nothing without proper seed directory path", async () => {
    prismaMock.system.findMany.mockResolvedValue([]);

    await seedSeries(repository, mockSystems);

    [
      "Seeding Series...",
      "Read file: undefined/series.json",
      "Series inserted: 0",
    ].forEach((text) => expect(logSpy).toHaveBeenCalledWith(text));
    expect(prismaMock.series.create).toHaveBeenCalledTimes(0);
    expect(logSpy).toHaveBeenCalledTimes(4);
  });

  it("throws error when system is not found", async () => {
    const seriesSeed = mockSeriesSeeds[0];
    const oldSystem = seriesSeed.system;
    const nonExistingSystem = "NotExistingSystem";
    seriesSeed.system = nonExistingSystem;

    fsReadFileSyncMock.mockReturnValueOnce(JSON.stringify([seriesSeed]));
    try {
      await seedSeries(repository, mockSystems);
    } catch (e) {
      const error = e as Error;
      expect(error.message).toBe(
        `System '${nonExistingSystem}' not found in database. Run seeding of systems first!`
      );
    }

    seriesSeed.system = oldSystem;
    expect(prismaMock.adventure.create).toHaveBeenCalledTimes(0);
  });

  it("do not import if exists", async () => {
    mockContentOfImportingFile();
    prismaMock.series.findMany.mockResolvedValue(mockSeries);

    await seedSeries(repository, mockSystems);

    ["Seeding Series...", "Series inserted: 0"].forEach((text) =>
      expect(logSpy).toHaveBeenCalledWith(text)
    );
    expect(prismaMock.series.create).toHaveBeenCalledTimes(0);
    expect(logSpy).toHaveBeenCalledTimes(2);
  });
});
