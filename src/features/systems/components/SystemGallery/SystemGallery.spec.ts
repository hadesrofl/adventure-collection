import { prismaMock } from "@tests/setup/prisma";
import { SystemGalleryPageObject } from "./SystemGallery.page";
import { mockFullSystems } from "@tests/mockData/mockSystemsFull";

describe("System Gallery", () => {
  it("renders", async () => {
    // Arrange
    prismaMock.system.findMany
      .mockResolvedValueOnce(mockFullSystems)
      .mockResolvedValueOnce([mockFullSystems[1]]);
    const page = new SystemGalleryPageObject(mockFullSystems);

    // Act
    page.render();

    // Assert
    expect((await page.systemEntries()).length).toBe(mockFullSystems.length);
    for (let i = 0; i < mockFullSystems.length; i += 1) {
      const system = mockFullSystems[i];
      expect(await page.systemButtonGroup(system.name)).toBeInTheDocument();
      expect(page.addSystemButton).toBeInTheDocument();
      expect(await page.systemByText(system.name)).toBeInTheDocument();
      // we include the name here because the test id gives us the badge with the contained chip element and the tag name in it
      expect((await page.adventureCountByText(system.name)).textContent).toBe(
        system.adventures.length.toString()
      );
    }
  });
});
