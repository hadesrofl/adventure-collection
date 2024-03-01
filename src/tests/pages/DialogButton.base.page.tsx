import { screen } from "@testing-library/react";

export class DialogButtonBasePage {
  protected title: string;
  protected text: string;
  protected cancelButtonLabel: string;
  protected okButtonLabel: string;

  constructor(
    title: string,
    contextText: string,
    cancelButtonLabel: string,
    okButtonLabel: string
  ) {
    this.title = title;
    this.text = contextText;
    this.cancelButtonLabel = cancelButtonLabel;
    this.okButtonLabel = okButtonLabel;
  }

  get dialogTitle() {
    return screen.queryByText(this.title);
  }

  get contentText() {
    return screen.queryByText(this.text);
  }

  get cancelButton() {
    return screen.queryByText(this.cancelButtonLabel);
  }

  get okButton() {
    return screen.queryByText(this.okButtonLabel);
  }
}
