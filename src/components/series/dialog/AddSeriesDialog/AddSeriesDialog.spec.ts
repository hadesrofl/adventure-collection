import { mockUseRouter } from "@tests/setup/nextNavigation";
import { screen, waitFor } from "@testing-library/react";
import { mockFetch } from "@tests/mocks/fetch";
import { getDictionary } from "@dictionaries/helpers/getDictionaries";
import { defaultLocale } from "@dictionaries/helpers/locales";
import { mockSystems } from "@tests/mockData/mockSystems";
import ApiRoutes from "@app/api/apiRoutes";
import { AddSeriesDialogPage } from "./AddSeriesDialog.page";
import { AddSeriesDialogProps } from "./AddSeriesDialog";

describe("Add Series Dialog", () => {
  const defaultSystems = mockSystems;
  const defaultPageProps: AddSeriesDialogProps = {
    open: true,
    systems: defaultSystems,
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
    const page = new AddSeriesDialogPage(dictionary);

    // Act
    page.render({ ...defaultPageProps, open: false });

    // Assert
    expect(
      screen.queryByText(dictionary.AddSeriesDialogButton.titleText)
    ).not.toBeInTheDocument();
  });

  it("opens", async () => {
    // Arrange
    const dictionary = await getDictionary(defaultLocale);
    const page = new AddSeriesDialogPage(dictionary);

    // Act
    page.render(defaultPageProps);

    // Assert
    expect(page.dialogTitle.textContent).toBe(
      dictionary.AddSeriesDialogButton.titleText
    );
    expect(page.contentText.textContent).toBe(
      dictionary.AddSeriesDialogButton.contentText
    );
    expect(page.cancelButton).toBeVisible();
    expect(page.okButton).toBeVisible();
    expect(page.okButton).toBeDisabled();
  });

  it("closes", async () => {
    // Arrange
    const dictionary = await getDictionary(defaultLocale);
    const page = new AddSeriesDialogPage(dictionary);
    page.render({ ...defaultPageProps, open: true });

    // Act & Assert
    expect(page.dialogTitle.textContent).toBe(
      dictionary.AddSeriesDialogButton.titleText
    );

    await page.closeDialog();
    expect(defaultPageProps.onClose).toHaveBeenCalled();
  });

  it("adds", async () => {
    // Arrange
    const seriesName = "DCC Horror";
    const dictionary = await getDictionary(defaultLocale);
    const page = new AddSeriesDialogPage(dictionary);
    page.render(defaultPageProps);

    // Act
    await page.add(seriesName, defaultSystems[0]);

    // Assert
    await waitFor(async () => {
      expect(mockFetch).toHaveBeenCalledWith(ApiRoutes.series.createSeries(), {
        body: JSON.stringify({
          id: 0,
          name: seriesName,
          createdAt: new Date(Date.now()),
          systemId: defaultSystems[0].id,
        }),
        method: "POST",
      });
      expect(mockUseRouter.refresh).toHaveBeenCalledTimes(1);
      expect(defaultPageProps.onClose).toHaveBeenCalled();
    });
  });

  it("add button is disabled when no system is selected", async () => {
    // Arrange
    const seriesName = "DCC Horror";
    const dictionary = await getDictionary(defaultLocale);
    const page = new AddSeriesDialogPage(dictionary);
    page.render(defaultPageProps);

    // Act
    await page.selectSystem(defaultSystems[0].name);

    // Assert
    expect(page.okButton).toBeDisabled();
  });

  it("add button is disabled when no series is entered", async () => {
    // Arrange
    const seriesName = "DCC Horror";
    const dictionary = await getDictionary(defaultLocale);
    const page = new AddSeriesDialogPage(dictionary);
    page.render(defaultPageProps);

    // Act
    await page.enterSeries(seriesName);

    // Assert
    expect(page.okButton).toBeDisabled();
  });
});
