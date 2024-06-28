import { Dictionary } from "@dictionaries/helpers/getDictionaries";
import { render, screen } from "@testing-library/react";
import { userEvent, UserEvent } from "@testing-library/user-event";
import AddSystemDialogButton from "./AddSystemDialogButton";
import { AddSystemDialogPage } from "../dialog/AddSystemDialog/AddSystemDialog.page";

export class AddSystemDialogButtonPage {
  private user: UserEvent;
  private dialogPage: AddSystemDialogPage;

  constructor(dictionary: Dictionary) {
    this.user = userEvent.setup();
    this.dialogPage = new AddSystemDialogPage(dictionary);
  }

  render() {
    render(<AddSystemDialogButton />);
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
