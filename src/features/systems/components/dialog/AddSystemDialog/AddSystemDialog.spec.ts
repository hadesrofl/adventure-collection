import { mockUseRouter } from "@tests/setup/nextNavigation";
import { screen, waitFor } from "@testing-library/react";
import { mockFetch } from "@tests/mocks/fetch";
import { getDictionary } from "@dictionaries/helpers/getDictionaries";
import { defaultLocale } from "@dictionaries/helpers/locales";
import ApiRoutes from "@routes/apiRoutes";
import { AddSystemDialogPage } from "./AddSystemDialog.page";
import { AddSystemDialogProps } from "./AddSystemDialog";

describe("Add System Dialog", () => {
  const defaultPageProps: AddSystemDialogProps = {
    open: true,
    onClose: jest.fn(),
  };
  const originalDateNow = Date.now;

  beforeAll(() => {
    const now = Date.now();
    global.Date.now = jest.fn(() => new Date(now).getTime());
  });

  afterAll(() => {
    global.Date.now = originalDateNow;
  });

  it("is not shown", async () => {
    // Arrange
    const dictionary = await getDictionary(defaultLocale);
    const page = new AddSystemDialogPage(dictionary);

    // Act
    page.render({ ...defaultPageProps, open: false });

    // Assert
    expect(
      screen.queryByText(dictionary.AddSystemDialogButton.titleText)
    ).not.toBeInTheDocument();
  });

  it("opens", async () => {
    // Arrange
    const dictionary = await getDictionary(defaultLocale);
    const page = new AddSystemDialogPage(dictionary);

    // Act
    page.render(defaultPageProps);

    // Assert
    expect(page.dialogTitle.textContent).toBe(
      dictionary.AddSystemDialogButton.titleText
    );
    expect(page.contentText.textContent).toBe(
      dictionary.AddSystemDialogButton.contentText
    );
    expect(page.cancelButton).toBeVisible();
    expect(page.okButton).toBeVisible();
    expect(page.okButton).toBeDisabled();
  });

  it("closes", async () => {
    // Arrange
    const dictionary = await getDictionary(defaultLocale);
    const page = new AddSystemDialogPage(dictionary);
    page.render({ ...defaultPageProps, open: true });

    // Act & Assert
    expect(page.dialogTitle.textContent).toBe(
      dictionary.AddSystemDialogButton.titleText
    );

    await page.closeDialog();
    expect(defaultPageProps.onClose).toHaveBeenCalled();
  });

  it("adds", async () => {
    // Arrange
    const systemName = "DCC";
    const dictionary = await getDictionary(defaultLocale);
    const page = new AddSystemDialogPage(dictionary);
    page.render(defaultPageProps);

    // Act
    await page.add(systemName);

    // Assert
    await waitFor(async () => {
      expect(mockFetch).toHaveBeenCalledWith(ApiRoutes.systems.createSystem(), {
        body: JSON.stringify({
          id: 0,
          name: systemName,
          createdAt: new Date(Date.now()),
        }),
        method: "POST",
      });
      expect(mockUseRouter.refresh).toHaveBeenCalledTimes(1);
      expect(defaultPageProps.onClose).toHaveBeenCalled();
    });
  });

  it("add button is disabled when no system is entered", async () => {
    // Arrange
    const dictionary = await getDictionary(defaultLocale);
    const page = new AddSystemDialogPage(dictionary);

    // Act
    page.render(defaultPageProps);

    // Assert
    expect(page.okButton).toBeDisabled();
  });
});
