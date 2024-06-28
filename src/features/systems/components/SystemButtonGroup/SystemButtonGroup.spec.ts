import { mockUseRouter } from "@tests/setup/nextNavigation";
import { waitFor } from "@testing-library/react";
import ApiRoutes from "@routes/apiRoutes";
import { mockFetch } from "@tests/mocks/fetch";
import { SystemButtonGroupPage } from "./SystemButtonGroup.page";
import { mockSystems } from "@tests/mockData/mockSystems";

describe("System Button Group", () => {
  const defaultSystem = mockSystems[0];
  it("renders", async () => {
    // Arrange
    const page = new SystemButtonGroupPage(defaultSystem);

    // Act
    page.render();

    // Assert
    expect(await page.editDialogButton()).toBeInTheDocument();
    expect(await page.deleteDialogButton()).toBeInTheDocument();
  });

  describe("delete dialog", () => {
    it("opens", async () => {
      // Arrange
      const page = new SystemButtonGroupPage(defaultSystem);

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
      const page = new SystemButtonGroupPage(defaultSystem);
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
      const page = new SystemButtonGroupPage(defaultSystem);
      page.render();
      expect(await page.deleteDialogButton()).toBeVisible();

      // Act
      await page.openDeleteDialog();
      await page.deleteDialog.delete();

      // Assert
      await waitFor(async () => {
        expect(mockFetch).toHaveBeenCalledWith(
          ApiRoutes.systems.deleteSystem(defaultSystem.id),
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
      const page = new SystemButtonGroupPage(defaultSystem);
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
      const page = new SystemButtonGroupPage(defaultSystem);
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
      const newName = "Shadow of the Demonlord";
      const page = new SystemButtonGroupPage(defaultSystem);
      page.render();
      expect(await page.editDialogButton()).toBeVisible();

      // Act
      await page.openEditDialog();
      await page.editDialog.edit(defaultSystem.name, newName);

      // Assert
      await waitFor(async () => {
        expect(mockFetch).toHaveBeenCalledWith(
          ApiRoutes.systems.editSystem(defaultSystem.id),
          {
            body: JSON.stringify({ ...defaultSystem, name: newName }),
            method: "PUT",
          }
        );
        expect(mockUseRouter.refresh).toHaveBeenCalledTimes(1);
        expect(page.editDialog.dialogTitle).not.toBeVisible();
      });
    });
  });
});
