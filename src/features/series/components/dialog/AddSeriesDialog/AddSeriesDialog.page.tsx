import { Dictionary } from "@dictionaries/helpers/getDictionaries";
import { System } from "@features/systems";
import { render, screen, within } from "@testing-library/react";
import { userEvent, UserEvent } from "@testing-library/user-event";
import { DialogButtonBasePage } from "@tests/pages/DialogButton.base.page";
import AddSeriesDialog, { AddSeriesDialogProps } from "./AddSeriesDialog";

export class AddSeriesDialogPage extends DialogButtonBasePage {
  private user: UserEvent;

  constructor(dictionary: Dictionary) {
    super(
      dictionary.AddSeriesDialogButton.titleText,
      dictionary.AddSeriesDialogButton.contentText,
      dictionary.AddSeriesDialogButton.cancelButton,
      dictionary.AddSeriesDialogButton.okButton
    );
    this.user = userEvent.setup();
  }

  render(props: AddSeriesDialogProps) {
    render(<AddSeriesDialog {...props} />);
  }

  async closeDialog() {
    await this.user.click(this.cancelButton);
  }

  async selectList() {
    return screen.findByRole("listbox");
  }

  async selectSystem(name: string) {
    const systemSelect = screen.getByRole("combobox");
    expect(systemSelect).toBeInTheDocument();
    await this.user.click(systemSelect);
    const selectionList = await this.selectList();
    expect(selectionList).toBeInTheDocument();
    const entry = within(selectionList).getByText(name);
    await this.user.click(entry);
  }

  get seriesInputField() {
    const inputField = document.querySelector("input.MuiInput-input");
    if (inputField === null) throw new Error("Can't find series input field");
    return inputField;
  }

  async enterSeries(seriesName: string) {
    if (
      this.seriesInputField.textContent !== null &&
      this.seriesInputField.textContent !== ""
    )
      await this.user.clear(this.seriesInputField);

    await this.user.type(this.seriesInputField, seriesName);
  }

  async add(seriesName: string, system: System) {
    await this.selectSystem(system.name);
    await this.enterSeries(seriesName);
    if (this.okButton !== null) {
      expect(this.okButton).not.toBeDisabled();
      await this.user.click(this.okButton);
    }
  }
}
