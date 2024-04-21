import { mockUseRouter } from "@tests/setup/nextNavigation";
import { waitFor } from "@testing-library/react";
import ApiRoutes from "../../../app/api/apiRoutes";
import { mockFetch } from "@tests/mocks/fetch";
import { SeriesButtonGroupPage } from "./SeriesButtonGroup.page";
import { mockSeries } from "@tests/mockData/mockSeries";

describe("Series Button Group", () => {
  const defaultSeries = mockSeries[0];
  it("renders", async () => {
    // Arrange
    const page = new SeriesButtonGroupPage(defaultSeries);

    // Act
    page.render();

    // Assert
    expect(await page.editDialogButton()).toBeInTheDocument();
    expect(await page.deleteDialogButton()).toBeInTheDocument();
  });

  describe("delete dialog", () => {
    it("opens", async () => {
      // Arrange
      const page = new SeriesButtonGroupPage(defaultSeries);

      page.render();
      expect(await page.deleteDialogButton()).toBeInTheDocument();

      // Act
      await page.openDeleteDialog();

      // Assert
      expect(page.deleteDialog.dialogTitle).toBeVisible();
      expect(page.deleteDialog.contentText).toBeVisible();
      expect(page.deleteDialog.cancelButton).toBeVisible();
      expect(page.deleteDialog.okButton).toBeVisible();
    });

    it("closes", async () => {
      // Arrange
      const page = new SeriesButtonGroupPage(defaultSeries);
      page.render();
      expect(await page.deleteDialogButton()).toBeInTheDocument();

      // Act & Assert
      await page.openDeleteDialog();
      expect(page.deleteDialog.dialogTitle).toBeVisible();

      await page.closeDeleteDialog();
      expect(page.deleteDialog.dialogTitle).not.toBeVisible();
    });

    it("deletes", async () => {
      // Arrange
      const page = new SeriesButtonGroupPage(defaultSeries);
      page.render();
      expect(await page.deleteDialogButton()).toBeVisible();

      // Act
      await page.openDeleteDialog();
      await page.deleteDialog.delete();

      // Assert
      await waitFor(async () => {
        expect(mockFetch).toHaveBeenCalledWith(
          ApiRoutes.series.deleteSeries(defaultSeries.id),
          {
            method: "DELETE",
          }
        );
        expect(mockUseRouter.refresh).toHaveBeenCalledTimes(1);
        expect(page.deleteDialog.dialogTitle).not.toBeVisible();
      });
    });
  });

  describe("edit dialog", () => {
    it("opens", async () => {
      // Arrange
      const page = new SeriesButtonGroupPage(defaultSeries);
      page.render();
      expect(await page.editDialogButton()).toBeInTheDocument();

      // Act
      await page.openEditDialog();

      // Assert
      expect(page.editDialog.dialogTitle).toBeInTheDocument();
      expect(page.editDialog.contentText).toBeInTheDocument();
      expect(page.editDialog.cancelButton).toBeInTheDocument();
      expect(page.editDialog.okButton).toBeInTheDocument();
    });

    it("closes", async () => {
      // Arrange
      const page = new SeriesButtonGroupPage(defaultSeries);
      page.render();
      expect(await page.editDialogButton()).toBeInTheDocument();

      // Act & Assert
      await page.openEditDialog();
      expect(page.editDialog.dialogTitle).toBeVisible();

      await page.closeEditDialog();
      expect(page.editDialog.dialogTitle).not.toBeVisible();
    });

    it("edits", async () => {
      // Arrange
      const newName = "DCC Horror";
      const page = new SeriesButtonGroupPage(defaultSeries);
      page.render();
      expect(await page.editDialogButton()).toBeVisible();

      // Act
      await page.openEditDialog();
      await page.editDialog.edit(defaultSeries.name, newName);

      // Assert
      await waitFor(async () => {
        expect(mockFetch).toHaveBeenCalledWith(
          ApiRoutes.series.editSeries(defaultSeries.id),
          {
            body: JSON.stringify({ ...defaultSeries, name: newName }),
            method: "PUT",
          }
        );
        expect(mockUseRouter.refresh).toHaveBeenCalledTimes(1);
        expect(page.editDialog.dialogTitle).not.toBeVisible();
      });
    });
  });
});
