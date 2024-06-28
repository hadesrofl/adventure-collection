import { Dictionary } from "@dictionaries/helpers/getDictionaries";
import { render } from "@testing-library/react";
import { userEvent, UserEvent } from "@testing-library/user-event";
import { DialogButtonBasePage } from "@tests/pages/DialogButton.base.page";
import AddSystemDialog, { AddSystemDialogProps } from "./AddSystemDialog";

export class AddSystemDialogPage extends DialogButtonBasePage {
  private user: UserEvent;

  constructor(dictionary: Dictionary) {
    super(
      dictionary.AddSystemDialogButton.titleText,
      dictionary.AddSystemDialogButton.contentText,
      dictionary.AddSystemDialogButton.cancelButton,
      dictionary.AddSystemDialogButton.okButton
    );
    this.user = userEvent.setup();
  }

  render(props: AddSystemDialogProps) {
    render(<AddSystemDialog {...props} />);
  }

  async closeDialog() {
    await this.user.click(this.cancelButton);
  }

  get systemInputField() {
    const inputField = document.querySelector("input.MuiInput-input");
    if (inputField === null) throw new Error("Can't find system input field");
    return inputField;
  }

  async enterSystem(seriesName: string) {
    if (
      this.systemInputField.textContent !== null &&
      this.systemInputField.textContent !== ""
    )
      await this.user.clear(this.systemInputField);

    await this.user.type(this.systemInputField, seriesName);
  }

  async add(systemName: string) {
    await this.enterSystem(systemName);
    if (this.okButton !== null) {
      expect(this.okButton).not.toBeDisabled();
      await this.user.click(this.okButton);
    }
  }
}
