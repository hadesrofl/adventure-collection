import { mockAdventures } from "@tests/mockData/mockAdventures";
import { AdventureCardPageObject } from "./AdventureCard.page";
import AppRoutes from "@app/appRoutes";

describe("Adventure Card", () => {
  it("shows the card", async () => {
    const adventure = mockAdventures[0];
    const page = new AdventureCardPageObject({ adventure });
    page.render();
    await page.assertToBeInTheDocument();
  });

  it("shows card with link to detail page", () => {
    const adventure = mockAdventures[0];
    const href = AppRoutes.adventureRoutes.show(adventure.id);
    const page = new AdventureCardPageObject({ adventure, href });
    page.render();

    const linkToDetailPage = page.linkToDetailPage;
    expect(linkToDetailPage).toBeInTheDocument();
    expect(page.linkToDetailPage?.getAttribute("href")).toBe(href);
  });
});
