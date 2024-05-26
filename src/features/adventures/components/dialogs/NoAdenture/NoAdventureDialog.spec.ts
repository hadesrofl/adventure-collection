import { NoAdventureDialogPage } from "./NoAdventureDialog.page";
import { waitFor } from "@testing-library/react";
import AppRoutes from "@routes/appRoutes";
import { mockUseRouter } from "@tests/setup/nextNavigation";

describe("NoAdventureDialog", () => {
  it("renders", async () => {
    const page = new NoAdventureDialogPage();

    page.render();
    expect(await page.dialog()).toBeInTheDocument();
  });

  it("shows content", async () => {
    const page = new NoAdventureDialogPage();

    page.render();
    expect(await page.dialog()).toBeInTheDocument();
    expect(await page.title()).toBeInTheDocument();
    expect(await page.contextText()).toBeInTheDocument();
    expect(await page.yesButton()).toBeInTheDocument();
    expect(await page.noButton()).toBeInTheDocument();
  });

  it("gets confirmed and disappears", async () => {
    const page = new NoAdventureDialogPage();

    page.render();
    expect(await page.dialog()).toBeInTheDocument();
    await page.clickYes();
    await waitFor(async () => {
      expect(mockUseRouter.push).toHaveBeenCalledTimes(1);
      expect(mockUseRouter.push).toHaveBeenCalledWith(
        AppRoutes.adventureRoutes.create
      );
      expect(await page.dialog()).not.toBeVisible();
    });
  });

  it("gets cancelled and disappears", async () => {
    const page = new NoAdventureDialogPage();

    page.render();
    expect(await page.dialog()).toBeInTheDocument();
    await page.clickNo();
    await waitFor(async () => {
      expect(mockUseRouter.refresh).toHaveBeenCalledTimes(1);
      expect(await page.dialog()).not.toBeVisible();
    });
  });
});
