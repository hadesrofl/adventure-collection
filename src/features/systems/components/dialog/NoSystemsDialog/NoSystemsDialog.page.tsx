import { render, screen } from "@testing-library/react";
import { NoDialogBasePage } from "@tests/pages/NoDialog.base.page";
import NoSystemsDialog from "./NoSystemsDialog";
import { Dictionary } from "@dictionaries/helpers/getDictionaries";
import { AddSystemDialogPage } from "../AddSystemDialog/AddSystemDialog.page";

export class NoSystemsDialogPage extends NoDialogBasePage {
  private readonly addDialogPage: AddSystemDialogPage;

  constructor(dictionary: Dictionary) {
    super();
    this.addDialogPage = new AddSystemDialogPage(dictionary);
  }

  render() {
    render(<NoSystemsDialog />);
  }

  get addDialog() {
    return this.addDialogPage;
  }

  async title() {
    return await screen.findByText(this.dictionary.NoSystemsDialog.title);
  }

  async contextText() {
    return await screen.findByText(this.dictionary.NoSystemsDialog.contextText);
  }

  async yesButton() {
    return await screen.findByText(this.dictionary.NoSystemsDialog.buttons.yes);
  }

  async noButton() {
    return await screen.findByText(this.dictionary.NoSystemsDialog.buttons.no);
  }
}
