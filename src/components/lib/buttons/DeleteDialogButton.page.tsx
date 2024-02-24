import userEvent, { UserEvent } from "@testing-library/user-event";
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
    await this.user.click(await this.okButton());
  }
}
