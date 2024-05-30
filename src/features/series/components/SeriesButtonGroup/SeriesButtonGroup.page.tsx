import { Dictionary } from "@dictionaries/helpers/getDictionaries";
import userEvent, { UserEvent } from "@testing-library/user-event";
import { default as defaultDictionary } from "@dictionaries/en.json";
import SeriesButtonGroup from "./SeriesButtonGroup";
import { render, screen, waitFor } from "@testing-library/react";
import { InputDialogButtonPage } from "@components/buttons/InputDialogButton.page";
import { DeleteDialogButtonPage } from "@components/buttons/DeleteDialogButton.page";
import { TestIds } from "@tests/testIds";
import { Series } from "@features/series";

export class SeriesButtonGroupPage {
  private user: UserEvent;
  private dictionary: Dictionary;
  private series: Series;

  editDialog: InputDialogButtonPage;
  deleteDialog: DeleteDialogButtonPage;

  constructor(series: Series) {
    this.user = userEvent.setup();
    this.dictionary = defaultDictionary;
    this.series = series;
    this.editDialog = new InputDialogButtonPage(
      this.dictionary.SeriesButtonGroup.editDialog.title,
      `${this.dictionary.SeriesButtonGroup.editDialog.contextText} ${series.name}`,
      this.dictionary.SeriesButtonGroup.editDialog.buttons.cancelLabel,
      this.dictionary.SeriesButtonGroup.editDialog.buttons.okLabel
    );
    this.deleteDialog = new DeleteDialogButtonPage(
      this.dictionary.SeriesButtonGroup.deleteDialog.title,
      `${this.dictionary.SeriesButtonGroup.deleteDialog.contextText} ${series.name}`,
      this.dictionary.SeriesButtonGroup.deleteDialog.buttons.cancelLabel,
      this.dictionary.SeriesButtonGroup.deleteDialog.buttons.okLabel
    );
  }

  render() {
    render(<SeriesButtonGroup series={this.series} />);
  }

  async editDialogButton() {
    return await screen.findByTestId(
      TestIds.seriesButtonGroup.inputDialogButton(this.series.name)
    );
  }

  async openEditDialog() {
    await this.user.click(await this.editDialogButton());
    await waitFor(async () => {
      expect(await this.editDialog.dialogTitle).toBeInTheDocument();
    });
  }

  async closeEditDialog() {
    await this.user.click(await this.editDialog.cancelButton);
    await waitFor(async () => {
      expect(await this.editDialog.dialogTitle).not.toBeVisible();
    });
  }

  async deleteDialogButton() {
    return await screen.findByTestId(
      TestIds.seriesButtonGroup.deleteDialogButton(this.series.name)
    );
  }

  async openDeleteDialog() {
    await this.user.click(await this.deleteDialogButton());
    await waitFor(async () => {
      expect(await this.deleteDialog.dialogTitle).toBeVisible();
    });
  }

  async closeDeleteDialog() {
    await this.deleteDialog.cancel();
    await waitFor(async () => {
      expect(await this.deleteDialog.dialogTitle).not.toBeVisible();
    });
  }
}
