import { SystemRepository } from "@features/systems";
import { mockSystemSeeds, mockSystems } from "@tests/mockData/mockSystems";
import { prismaMock } from "@tests/setup/prisma";
import { fsReadFileSyncMock } from "@tests/mocks/fs";
import { seedSystems } from "./seedSystems";
import { logSpy } from "@tests/mocks/consoleLog";
import { AdventureRepository } from "@features/adventures/repositoryExports";

function mockContentOfImportingFile() {
  fsReadFileSyncMock.mockReturnValueOnce(JSON.stringify(mockSystemSeeds));
}

describe("Seed Systems", () => {
  const repository = new SystemRepository(
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

    prismaMock.system.findMany.mockResolvedValue([]);
    prismaMock.system.create
      .mockResolvedValueOnce(mockSystems[0])
      .mockResolvedValueOnce(mockSystems[1]);

    await seedSystems(repository);

    [
      "Seeding Systems...",
      mockSystems[0],
      mockSystems[1],
      "Systems inserted: 2",
    ].forEach((text) => expect(logSpy).toHaveBeenCalledWith(text));
    expect(prismaMock.system.create).toHaveBeenCalledTimes(2);
    expect(logSpy).toHaveBeenCalledTimes(4);
  });

  it("imports nothing without proper seed directory path", async () => {
    prismaMock.system.findMany.mockResolvedValue([]);

    await seedSystems(repository);

    [
      "Seeding Systems...",
      "Read file: undefined/systems.json",
      "Systems inserted: 0",
    ].forEach((text) => expect(logSpy).toHaveBeenCalledWith(text));
    expect(prismaMock.system.create).toHaveBeenCalledTimes(0);
    expect(logSpy).toHaveBeenCalledTimes(4);
  });

  it("do not import if exists", async () => {
    mockContentOfImportingFile();
    prismaMock.system.findMany.mockResolvedValue(mockSystems);

    await seedSystems(repository);

    ["Seeding Systems...", , "Systems inserted: 0"].forEach((text) =>
      expect(logSpy).toHaveBeenCalledWith(text)
    );
    expect(prismaMock.system.create).toHaveBeenCalledTimes(0);
    expect(logSpy).toHaveBeenCalledTimes(2);
  });
});
