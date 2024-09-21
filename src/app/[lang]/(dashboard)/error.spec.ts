import { getDictionary } from "@dictionaries/helpers/getDictionaries";
import { ErrorPageObject } from "./error.page";
import { screen } from "@testing-library/react";
import { mockUseRouter } from "@tests/setup/nextNavigation";

async function initPage(error: Error, lang: "en" | "de" = "en") {
  const dictionary = await getDictionary(lang);
  return new ErrorPageObject(error, dictionary);
}

describe("Error Page", () => {
  beforeEach(() => {});

  it("shows error", async () => {
    const error = new Error("Test Error");
    const page = await initPage(error);

    page.render();

    expect(page.title).toBeInTheDocument();
    expect(page.errorMessage).toBeInTheDocument();
    expect(page.tryAgainButton).toBeInTheDocument();
    expect(page.backToHomeButton).toBeInTheDocument();
  });

  it("is multilingual", async () => {
    const dictionary = await getDictionary("de");
    const error = new Error("Test Error");
    const page = await initPage(error, "de");

    page.render();

    expect(
      screen.queryByText(dictionary.Errors.pages.generic.text)
    ).toBeInTheDocument();
    expect(screen.queryByText(error.message)).toBeInTheDocument();
    expect(
      screen.queryByText(dictionary.Errors.pages.generic.buttons.tryAgain)
    ).toBeInTheDocument();
    expect(
      screen.queryByText(dictionary.Errors.pages.generic.buttons.backToHome)
    ).toBeInTheDocument();
  });

  it("refreshes the page", async () => {
    const error = new Error("Test Error");
    const page = await initPage(error);

    page.render();

    const tryAgainButton = page.tryAgainButton;
    expect(tryAgainButton).not.toBeNull();
    await page.click(tryAgainButton as HTMLElement);

    expect(mockUseRouter.refresh).toHaveBeenCalled();
  });

  it("navigates to home page", async () => {
    const error = new Error("Test Error");
    const page = await initPage(error);

    page.render();

    const backToHome = page.backToHomeButton;
    expect(backToHome).not.toBeNull();
    await page.click(backToHome as HTMLElement);

    expect(mockUseRouter.replace).toHaveBeenCalledWith("http://localhost");
  });
});
