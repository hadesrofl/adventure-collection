import { prismaMock } from "@tests/setup/prisma";
import { AdventureCollectionPageObject } from "./AdventureCollection.page";
import { logSpy } from "@tests/mocks/consoleLog";
import { mockSystems } from "@tests/mockData/mockSystems";
import { mockGenres } from "@tests/mockData/mockGenres";
import { waitFor } from "@testing-library/react";
import { mockAdventures } from "@tests/mockData/mockAdventures";

describe("Adventure Collection Page", () => {
  const beginSeedingLogMessage = "--- Begin Seeding ---";

  beforeEach(() => {
    prismaMock.system.findMany.mockResolvedValue(mockSystems);
    prismaMock.genre.findMany.mockResolvedValue(mockGenres);
    prismaMock.adventure.findMany.mockResolvedValue(mockAdventures);
  });

  it("shows no adventure dialog", async () => {
    prismaMock.adventure.findMany.mockResolvedValue([]);
    const page = new AdventureCollectionPageObject();
    await page.render();

    await waitFor(async () => {
      expect(page.gallery.page).not.toBeInTheDocument();
      expect(await page.noAdventureDialog.dialog()).toBeInTheDocument();
    });
  });

  it("starts seeding", async () => {
    process.env = {
      ...process.env,
      DATABASE_SEED_DATA: "true",
    };
    const page = new AdventureCollectionPageObject();
    await page.init();
    expect(logSpy).toHaveBeenCalledWith(beginSeedingLogMessage);
  });

  it.each([undefined, "false"])(
    "does not start seeding",
    async (DATABASE_SEED_DATA) => {
      process.env = {
        ...process.env,
        DATABASE_SEED_DATA,
      };

      const page = new AdventureCollectionPageObject();
      await page.init();
      expect(logSpy).not.toHaveBeenCalledWith(beginSeedingLogMessage);
    }
  );
});
