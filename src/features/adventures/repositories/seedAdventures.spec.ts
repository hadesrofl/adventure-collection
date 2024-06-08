import AdventureRepository from "./AdventureRepository";
import { prismaMock } from "@tests/setup/prisma";
import { fsReadFileSyncMock } from "@tests/mocks/fs";
import { logSpy } from "@tests/mocks/consoleLog";
import { mockGenres } from "@tests/mockData/mockGenres";
import { seedAdventures } from "./seedAdventures";
import { mockSystems } from "@tests/mockData/mockSystems";
import { mockSeries } from "@tests/mockData/mockSeries";
import { AdventureSeedData } from "@repositories/seeding/AdventureSeedData";
import { mockAdventureSeeds, mockAdventures } from "@tests/mockData/mockAdventures";

function mockContentOfImportingFile() {
  fsReadFileSyncMock.mockReturnValueOnce(JSON.stringify(mockAdventureSeeds));
}

describe("Seed Adventures", () => {
  const repository = new AdventureRepository(prismaMock);

  beforeEach(() => {
    process.env = {
      ...process.env,
      SEED_DATA_DIR: undefined,
    };
  });

  it("imports seeds", async () => {
    mockContentOfImportingFile();

    prismaMock.adventure.findMany.mockResolvedValue([]);
    mockAdventures.forEach((adventure) =>
      prismaMock.adventure.create.mockResolvedValueOnce(adventure)
    );

    await seedAdventures(repository, mockSystems, mockGenres, mockSeries);

    expect(logSpy).toHaveBeenCalledWith("Seeding Adventures...");
    mockAdventures.forEach((text) => expect(logSpy).toHaveBeenCalledWith(text));
    expect(prismaMock.adventure.create).toHaveBeenCalledTimes(2);
    expect(logSpy).toHaveBeenCalledWith("Adventures inserted: 2");
    expect(logSpy).toHaveBeenCalledTimes(4);
  });

  it("imports nothing without proper seed directory path", async () => {
    prismaMock.adventure.findMany.mockResolvedValue([]);

    await seedAdventures(repository, mockSystems, mockGenres, mockSeries);

    [
      "Seeding Adventures...",
      "Read file: undefined/adventures.json",
      "Adventures inserted: 0",
    ].forEach((text) => expect(logSpy).toHaveBeenCalledWith(text));
    expect(prismaMock.adventure.create).toHaveBeenCalledTimes(0);
    expect(logSpy).toHaveBeenCalledTimes(4);
  });

  it("do not import if exists", async () => {
    mockContentOfImportingFile();
    prismaMock.adventure.findMany.mockResolvedValue(mockAdventures);

    await seedAdventures(repository, mockSystems, mockGenres, mockSeries);

    ["Seeding Adventures...", , "Adventures inserted: 0"].forEach((text) =>
      expect(logSpy).toHaveBeenCalledWith(text)
    );
    expect(prismaMock.adventure.create).toHaveBeenCalledTimes(0);
    expect(logSpy).toHaveBeenCalledTimes(2);
  });

  it("throws error when genre is not found", async () => {
    const adventureSeed = mockAdventureSeeds[0];
    const oldGenres = adventureSeed.genres;
    const nonExistingGenre = "NotExistingGenre";
    adventureSeed.genres.push(nonExistingGenre);
    await checkErrorOnCreation(
      adventureSeed,
      repository,
      `Genre '${nonExistingGenre}' not found in database. Run seeding of genres first!`
    );
    adventureSeed.genres.pop();
    expect(prismaMock.adventure.create).toHaveBeenCalledTimes(0);
  });

  it("throws error when system is not found", async () => {
    const adventureSeed = mockAdventureSeeds[0];
    const oldSystem = adventureSeed.system;
    const nonExistingSystem = "NotExistingSystem";
    adventureSeed.system = nonExistingSystem;
    await checkErrorOnCreation(
      adventureSeed,
      repository,
      `System '${nonExistingSystem}' not found in database. Run seeding of systems first!`
    );
    adventureSeed.system = oldSystem;
    expect(prismaMock.adventure.create).toHaveBeenCalledTimes(0);
  });

  it("throws error when series is not found", async () => {
    const adventureSeed = mockAdventureSeeds[0];
    const oldSeries = adventureSeed.series;
    const notExistingSeries = "NotExistingSeries";
    adventureSeed.series = notExistingSeries;
    await checkErrorOnCreation(
      adventureSeed,
      repository,
      `Series '${notExistingSeries}' not found in database. Run seeding of series first!`
    );
    adventureSeed.series = oldSeries;
    expect(prismaMock.adventure.create).toHaveBeenCalledTimes(0);
  });
});

async function checkErrorOnCreation(
  adventureSeed: AdventureSeedData,
  repository: AdventureRepository,
  errorMessage: string
) {
  fsReadFileSyncMock.mockReturnValueOnce(JSON.stringify([adventureSeed]));
  try {
    await seedAdventures(repository, mockSystems, mockGenres, mockSeries);
  } catch (e) {
    const error = e as Error;
    expect(error.message).toBe(errorMessage);
  }
}
