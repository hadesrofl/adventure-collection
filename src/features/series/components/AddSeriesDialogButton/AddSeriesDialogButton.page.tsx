import { Dictionary } from "@dictionaries/helpers/getDictionaries";
import { System } from "@features/systems";
import { render, screen } from "@testing-library/react";
import userEvent, { UserEvent } from "@testing-library/user-event";
import AddSeriesDialogButton from "./AddSeriesDialogButton";
import { AddSeriesDialogPage } from "../dialog/AddSeriesDialog/AddSeriesDialog.page";

export class AddSeriesDialogButtonPage {
  private user: UserEvent;
  private systems: System[];
  private dialogPage: AddSeriesDialogPage;

  constructor(dictionary: Dictionary, systems: System[]) {
    this.user = userEvent.setup();
    this.systems = systems;
    this.dialogPage = new AddSeriesDialogPage(dictionary);
  }

  render() {
    render(<AddSeriesDialogButton systems={this.systems} />);
  }

  get addButton() {
    return screen.getByTestId("AddIcon");
  }

  async openDialog() {
    await this.user.click(this.addButton);
  }

  async closeDialog() {
    await this.dialogPage.closeDialog();
  }

  get dialog() {
    return this.dialogPage;
  }
}
