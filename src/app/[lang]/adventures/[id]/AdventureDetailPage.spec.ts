import { prismaMock } from "@tests/setup/prisma";
import { AdventureDetailPageObject } from "./AdventureDetailPage.page";
import { mockAdventures } from "@tests/mockData/mockAdventures";

async function initPage(
  id: Number,
  previousCardHref: string | undefined = undefined,
  nextCardHref: string | undefined = undefined
) {
  const adventure = mockAdventures.find((adventure) => adventure.id === id);

  if (adventure)
    prismaMock.adventure.findFirstOrThrow.mockResolvedValue(adventure);

  return new AdventureDetailPageObject(
    {
      params: { id: id.toString() },
    },
    previousCardHref,
    nextCardHref
  );
}

describe("Adventure Detail Page", () => {
  it("shows a card", async () => {
    const id = 1;
    const page = await initPage(id);
    await page.render();

    await page.carousel.card.assertToBeInTheDocument();
  });

  it("shows no navigation arrows", async () => {
    const id = 1;
    const page = await initPage(id);
    await page.render();

    expect(page.carousel.nextCardButton).not.toBeInTheDocument();
    expect(page.carousel.previousCardButton).not.toBeInTheDocument();
  });
});
