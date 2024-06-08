import AppRoutes from "@routes/appRoutes";
import { prismaMock } from "@tests/setup/prisma";
import { StaticCardCarouselPageObject } from "./StaticCardCarousel.page";
import { mockAdventures } from "@tests/mockData/mockAdventures";

async function initPage(
  id: Number,
  previousCardHref: string | undefined = undefined,
  nextCardHref: string | undefined = undefined
) {
  const adventure = mockAdventures.find((adventure) => adventure.id === id);

  if (adventure)
    prismaMock.adventure.findFirstOrThrow.mockResolvedValue(adventure);

  return new StaticCardCarouselPageObject({
    adventure,
    previousCardHref,
    nextCardHref,
  });
}

describe("Static Card Carousel", () => {
  it("shows navigation arrows", async () => {
    const id = 1;
    const page = await initPage(
      id,
      AppRoutes.adventureRoutes.show(id - 1),
      AppRoutes.adventureRoutes.show(id + 1)
    );
    page.render();

    expect(page.nextCardButton).toBeInTheDocument();
    expect(page.previousCardButton).toBeInTheDocument();
  });

  it("shows only previous card button", async () => {
    const id = 1;
    const page = await initPage(id, AppRoutes.adventureRoutes.show(id - 1));
    page.render();

    expect(page.nextCardButton).not.toBeInTheDocument();
    expect(page.previousCardButton).toBeInTheDocument();
  });

  it("shows only next card button", async () => {
    const id = 1;
    const page = await initPage(
      id,
      undefined,
      AppRoutes.adventureRoutes.show(id + 1)
    );
    page.render();

    expect(page.nextCardButton).toBeInTheDocument();
    expect(page.previousCardButton).not.toBeInTheDocument();
  });
});
