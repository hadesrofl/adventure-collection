import { mockAdventures } from "@tests/mockData/mockAdventures";
import { AdventureCardPageObject } from "./AdventureCard.page";
import AppRoutes from "@app/appRoutes";
import { prismaMock } from "@tests/setup/prisma";
import { waitFor } from "@testing-library/react";
import { adventureIncludes } from "@domain/models/adventure";

async function openDeleteDialog(page: AdventureCardPageObject) {
  expect(page.deleteButton).toBeInTheDocument();
  await page.clickButton("delete");

  await waitFor(() => {
    expect(page.dialog.dialogTitle).toBeInTheDocument();
    expect(page.dialog.okButton).toBeInTheDocument();
  });
}

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

  it("deletes adventure", async () => {
    const adventure = mockAdventures[0];
    const page = new AdventureCardPageObject({ adventure });
    page.render();

    await openDeleteDialog(page);

    if (page.dialog.okButton !== null) await page.dialog.delete();
    expect(prismaMock.adventure.delete).toHaveBeenCalledWith({
      where: { id: adventure.id },
      include: adventureIncludes,
    });
  });

  it("closes delete dialog and nothing happens", async () => {
    const adventure = mockAdventures[0];
    const page = new AdventureCardPageObject({ adventure });
    page.render();

    await openDeleteDialog(page);
    if (page.dialog.cancelButton !== null) await page.dialog.cancel();
    expect(prismaMock.adventure.delete).not.toHaveBeenCalled();
  });
});
