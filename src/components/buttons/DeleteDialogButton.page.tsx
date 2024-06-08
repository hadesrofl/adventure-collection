import { userEvent, UserEvent } from "@testing-library/user-event";
import { DialogButtonBasePage } from "@tests/pages/DialogButton.base.page";

export class DeleteDialogButtonPage extends DialogButtonBasePage {
  private user: UserEvent;

  constructor(
    title: string,
    contextText: string,
    cancelButtonLabel: string,
    okButtonLabel: string
  ) {
    super(title, contextText, cancelButtonLabel, okButtonLabel);
    this.user = userEvent.setup();
  }

  async delete() {
    const deleteButton = this.okButton;
    if (deleteButton === null) throw new Error("Delete button not found");
    await this.user.click(deleteButton);
  }

  async cancel() {
    const cancelButton = this.cancelButton;
    if (cancelButton === null) throw new Error("Cancel button not found");
    await this.user.click(cancelButton);
  }
}
