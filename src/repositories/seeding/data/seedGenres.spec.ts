import { GenreRepository } from "@features/genres";
import { prismaMock } from "@tests/setup/prisma";
import { fsReadFileSyncMock } from "@tests/mocks/fs";
import { logSpy } from "@tests/mocks/consoleLog";
import { mockGenres, mockGenreSeeds } from "@tests/mockData/mockGenres";
import { seedGenres } from "./seedGenres";
import { AdventureRepository } from "@features/adventures/repositoryExports";

function mockContentOfImportingFile() {
  fsReadFileSyncMock.mockReturnValueOnce(JSON.stringify(mockGenreSeeds));
}

describe("Seed Genres", () => {
  const repository = new GenreRepository(
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

    prismaMock.genre.findMany.mockResolvedValue([]);
    mockGenres.forEach((genre) =>
      prismaMock.genre.create.mockResolvedValueOnce(genre)
    );

    await seedGenres(repository);

    expect(logSpy).toHaveBeenCalledWith("Seeding Genres...");
    mockGenres.forEach((text) => expect(logSpy).toHaveBeenCalledWith(text));
    expect(prismaMock.genre.create).toHaveBeenCalledTimes(8);
    expect(logSpy).toHaveBeenCalledWith("Genres inserted: 8");
    expect(logSpy).toHaveBeenCalledTimes(10);
  });

  it("imports nothing without proper seed directory path", async () => {
    prismaMock.genre.findMany.mockResolvedValue([]);

    await seedGenres(repository);

    [
      "Seeding Genres...",
      "Read file: undefined/genres.json",
      "Genres inserted: 0",
    ].forEach((text) => expect(logSpy).toHaveBeenCalledWith(text));
    expect(prismaMock.genre.create).toHaveBeenCalledTimes(0);
    expect(logSpy).toHaveBeenCalledTimes(4);
  });

  it("do not import if exists", async () => {
    mockContentOfImportingFile();
    prismaMock.genre.findMany.mockResolvedValue(mockGenres);

    await seedGenres(repository);

    ["Seeding Genres...", , "Genres inserted: 0"].forEach((text) =>
      expect(logSpy).toHaveBeenCalledWith(text)
    );
    expect(prismaMock.genre.create).toHaveBeenCalledTimes(0);
    expect(logSpy).toHaveBeenCalledTimes(2);
  });
});
