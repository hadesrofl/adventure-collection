import { useRouter } from "next/navigation";
import { waitFor } from "@testing-library/react";
import { mockUseRouter } from "@tests/setup/nextNavigation";
import { NoSeriesDialogPage } from "./NoSeriesDialog.page";
import { mockSystems } from "@tests/mockData/mockSystems";
import { getDictionary } from "@dictionaries/helpers/getDictionaries";
import { defaultLocale } from "@dictionaries/helpers/locales";

jest.mock("next/navigation");

(useRouter as jest.Mock).mockReturnValue(mockUseRouter);

describe("NoSeriesDialog", () => {
  const defaultSystems = mockSystems;
  it("renders", async () => {
    // Arrange
    const dictionary = await getDictionary(defaultLocale);
    const page = new NoSeriesDialogPage(dictionary, defaultSystems);

    // Act
    page.render();

    // Assert
    expect(await page.dialog()).toBeInTheDocument();
  });

  it("shows content", async () => {
    // Arrange
    const dictionary = await getDictionary(defaultLocale);
    const page = new NoSeriesDialogPage(dictionary, defaultSystems);

    // Act
    page.render();

    // Assert
    expect(await page.dialog()).toBeVisible();
    expect(await page.title()).toBeVisible();
    expect(await page.contextText()).toBeVisible();
    expect(await page.yesButton()).toBeVisible();
    expect(await page.noButton()).toBeVisible();
  });

  it("gets confirmed and shows add series dialog", async () => {
    // Arrange
    const dictionary = await getDictionary(defaultLocale);
    const page = new NoSeriesDialogPage(dictionary, defaultSystems);
    page.render();
    expect(await page.title()).toBeVisible();

    // Act
    await page.clickYes();

    // Assert
    await waitFor(async () => {
      expect(await page.title()).not.toBeVisible();
      expect(page.addDialog.dialogTitle).toBeVisible();
    });
  });

  it("gets cancelled and disappears", async () => {
    // Arrange
    const dictionary = await getDictionary(defaultLocale);
    const page = new NoSeriesDialogPage(dictionary, defaultSystems);
    page.render();
    expect(await page.dialog()).toBeInTheDocument();

    // Act
    await page.clickNo();

    // Arrange
    await waitFor(async () => {
      expect(await page.dialog()).not.toBeVisible();
    });
  });
});
