import DictionaryProvider from "@dictionaries/helpers/dictionaryContext";
import { Dictionary } from "@dictionaries/helpers/getDictionaries";
import { render, screen } from "@testing-library/react";
import ErrorPage from "./error";
import userEvent, { UserEvent } from "@testing-library/user-event";

export class ErrorPageObject {
  private readonly error: Error;
  private readonly dictionary: Dictionary;
  private readonly user: UserEvent;

  constructor(error: Error, dictionary: Dictionary) {
    this.error = error;
    this.dictionary = dictionary;
    this.user = userEvent.setup();
  }

  render() {
    render(
      <DictionaryProvider dictionary={this.dictionary}>
        <ErrorPage error={this.error} />
      </DictionaryProvider>
    );
  }

  get title() {
    return screen.queryByText(this.dictionary.Errors.pages.generic.text);
  }

  get errorMessage() {
    return screen.queryByText(this.error.message);
  }

  get tryAgainButton() {
    return screen.queryByText(
      this.dictionary.Errors.pages.generic.buttons.tryAgain
    );
  }

  get backToHomeButton() {
    return screen.queryByText(
      this.dictionary.Errors.pages.generic.buttons.backToHome
    );
  }

  async click(button: HTMLElement) {
    await this.user.click(button);
  }
}
