import { AddSystemDialogButtonPage } from "./AddSystemDialogButton.page";
import { getDictionary } from "@dictionaries/helpers/getDictionaries";
import { defaultLocale } from "@dictionaries/helpers/locales";

describe("Add System Dialog Button", () => {
  const originalDateNow = Date.now;

  beforeAll(() => {
    const now = Date.now();
    global.Date.now = jest.fn(() => new Date(now).getTime());
  });

  afterAll(() => {
    global.Date.now = originalDateNow;
  });

  it("renders", async () => {
    // Arrange
    const dictionary = await getDictionary(defaultLocale);
    const page = new AddSystemDialogButtonPage(dictionary);

    // Act
    page.render();

    // Assert
    expect(page.addButton).toBeVisible();
  });

  describe("add dialog", () => {
    it("opens", async () => {
      // Arrange
      const dictionary = await getDictionary(defaultLocale);
      const page = new AddSystemDialogButtonPage(dictionary);

      // Act
      page.render();
      await page.openDialog();

      // Assert
      expect(page.dialog.dialogTitle.textContent).toBe(
        dictionary.AddSystemDialogButton.titleText
      );
      expect(page.dialog.contentText.textContent).toBe(
        dictionary.AddSystemDialogButton.contentText
      );
      expect(page.dialog.cancelButton).toBeVisible();
      expect(page.dialog.okButton).toBeVisible();
      expect(page.dialog.okButton).toBeDisabled();
    });

    it("closes", async () => {
      // Arrange
      const dictionary = await getDictionary(defaultLocale);
      const page = new AddSystemDialogButtonPage(dictionary);
      page.render();

      // Act & Assert
      await page.openDialog();
      expect(page.dialog.dialogTitle.textContent).toBe(
        dictionary.AddSystemDialogButton.titleText
      );

      await page.closeDialog();
      expect(page.dialog.dialogTitle).not.toBeVisible();
    });
  });
});
