import { render, screen } from "@testing-library/react";
import { NoDialogBasePage } from "@tests/pages/NoDialog.base.page";
import NoSeriesDialog from "./NoSeriesDialog";
import { System } from "@features/systems";
import { AddSeriesDialogPage } from "../AddSeriesDialog/AddSeriesDialog.page";
import { Dictionary } from "@dictionaries/helpers/getDictionaries";

export class NoSeriesDialogPage extends NoDialogBasePage {
  private readonly systems: System[];
  private readonly addDialogPage: AddSeriesDialogPage;

  constructor(dictionary: Dictionary, systems: System[]) {
    super();
    this.systems = systems;
    this.addDialogPage = new AddSeriesDialogPage(dictionary);
  }

  render() {
    render(<NoSeriesDialog systems={this.systems} />);
  }

  get addDialog() {
    return this.addDialogPage;
  }

  async title() {
    return await screen.findByText(this.dictionary.NoSeriesDialog.title);
  }

  async contextText() {
    return await screen.findByText(this.dictionary.NoSeriesDialog.contextText);
  }

  async yesButton() {
    return await screen.findByText(this.dictionary.NoSeriesDialog.buttons.yes);
  }

  async noButton() {
    return await screen.findByText(this.dictionary.NoSeriesDialog.buttons.no);
  }
}
