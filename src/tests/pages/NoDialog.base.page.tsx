import { screen } from "@testing-library/react";
import { Dictionary } from "@dictionaries/helpers/getDictionaries";
import userEvent, { UserEvent } from "@testing-library/user-event";
import { default as defaultDictionary } from "@dictionaries/en.json";

export abstract class NoDialogBasePage {
  private user: UserEvent;
  protected dictionary: Dictionary;
  constructor() {
    this.user = userEvent.setup();
    this.dictionary = defaultDictionary;
  }

  async dialog() {
    return await screen.findByRole("dialog");
  }

  abstract yesButton(): Promise<HTMLElement>;

  abstract noButton(): Promise<HTMLElement>;

  async clickYes() {
    await this.user.click(await this.yesButton());
  }

  async clickNo() {
    return await this.user.click(await this.noButton());
  }
}
