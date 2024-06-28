import { Dictionary } from "@dictionaries/helpers/getDictionaries";
import { default as defaultDictionary } from "@dictionaries/en.json";
import SystemButtonGroup from "./SystemButtonGroup";
import { render, screen, waitFor } from "@testing-library/react";
import { InputDialogButtonPage } from "@components/buttons/InputDialogButton.page";
import { DeleteDialogButtonPage } from "@components/buttons/DeleteDialogButton.page";
import { TestIds } from "@tests/testIds";
import { userEvent, UserEvent } from "@testing-library/user-event";
import { System } from "@features/systems";

export class SystemButtonGroupPage {
  private user: UserEvent;
  private dictionary: Dictionary;
  private system: System;

  editDialog: InputDialogButtonPage;
  deleteDialog: DeleteDialogButtonPage;

  constructor(system: System) {
    this.user = userEvent.setup();
    this.dictionary = defaultDictionary;
    this.system = system;
    this.editDialog = new InputDialogButtonPage(
      this.dictionary.SystemButtonGroup.editDialog.title,
      `${this.dictionary.SystemButtonGroup.editDialog.contextText} ${system.name}`,
      this.dictionary.SystemButtonGroup.editDialog.buttons.cancelLabel,
      this.dictionary.SystemButtonGroup.editDialog.buttons.okLabel
    );
    this.deleteDialog = new DeleteDialogButtonPage(
      this.dictionary.SystemButtonGroup.deleteDialog.title,
      `${this.dictionary.SystemButtonGroup.deleteDialog.contextText} ${system.name}`,
      this.dictionary.SystemButtonGroup.deleteDialog.buttons.cancelLabel,
      this.dictionary.SystemButtonGroup.deleteDialog.buttons.okLabel
    );
  }

  render() {
    render(<SystemButtonGroup system={this.system} />);
  }

  async editDialogButton() {
    return await screen.findByTestId(
      TestIds.systemButtonGroup.inputDialogButton(this.system.name)
    );
  }

  async openEditDialog() {
    await this.user.click(await this.editDialogButton());
    await waitFor(async () => {
      expect(this.editDialog.dialogTitle).toBeInTheDocument();
    });
  }

  async closeEditDialog() {
    await this.user.click(await this.editDialog.cancelButton);
    await waitFor(async () => {
      expect(this.editDialog.dialogTitle).not.toBeVisible();
    });
  }

  async deleteDialogButton() {
    return await screen.findByTestId(
      TestIds.systemButtonGroup.deleteDialogButton(this.system.name)
    );
  }

  async openDeleteDialog() {
    await this.user.click(await this.deleteDialogButton());
    await waitFor(async () => {
      expect(this.deleteDialog.dialogTitle).toBeVisible();
    });
  }

  async closeDeleteDialog() {
    await this.deleteDialog.cancel();
    await waitFor(async () => {
      expect(this.deleteDialog.dialogTitle).not.toBeVisible();
    });
  }
}
