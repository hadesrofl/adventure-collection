import { mockAdventures } from "@tests/mockData/mockAdventures";
import { AdventureGalleryPageObject } from "./AdventureCardGallery.page";
import { AdventureCardPageObject } from "./cards/AdventureCard.page";
import AppRoutes from "@app/appRoutes";

describe("Adventure Gallery", () => {
  it("shows nothing", async () => {
    const page = new AdventureGalleryPageObject({ adventures: [] });
    await page.render();

    expect(page.cards.length).toBe(0);
  });

  it("shows cards", async () => {
    const page = new AdventureGalleryPageObject({
      adventures: mockAdventures,
    });
    await page.render();

    expect(page.cards.length).toBe(mockAdventures.length);
    for (let i = 0; i < mockAdventures.length; i += 1) {
      const adventure = mockAdventures[i];
      const card = new AdventureCardPageObject({
        adventure,
        href: AppRoutes.adventureRoutes.show(adventure.id),
      });
      await card.assertToBeInTheDocument();
    }
  });
});
