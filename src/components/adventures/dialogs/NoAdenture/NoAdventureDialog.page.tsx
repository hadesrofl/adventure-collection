import { render, screen } from "@testing-library/react";
import NoAdventureDialog from "./NoAdventureDialog";
import { NoDialogBasePage } from "@tests/pages/NoDialog.base.page";

export class NoAdventureDialogPage extends NoDialogBasePage {
  render() {
    render(<NoAdventureDialog />);
  }

  async title() {
    return await screen.findByText(
      this.dictionary.AdventureCards.noAdventureDialog.title
    );
  }

  async contextText() {
    return await screen.findByText(
      this.dictionary.AdventureCards.noAdventureDialog.contextText
    );
  }

  async yesButton() {
    return await screen.findByText(
      this.dictionary.AdventureCards.noAdventureDialog.buttons.yes
    );
  }

  async noButton() {
    return await screen.findByText(
      this.dictionary.AdventureCards.noAdventureDialog.buttons.no
    );
  }
}
