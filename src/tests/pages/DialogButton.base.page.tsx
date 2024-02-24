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

  async dialog() {
    return await screen.findByText(this.title);
  }

  async contentText() {
    return await screen.findByText(this.text);
  }

  async cancelButton() {
    return await screen.findByText(this.cancelButtonLabel);
  }

  async okButton() {
    return await screen.findByText(this.okButtonLabel);
  }
}
