import { BasePage } from "@tests/pages/BasePage";
import AdventureForm, { AdventureFormProps } from "./AdventureForm";
import { userEvent, UserEvent } from "@testing-library/user-event";
import { render, screen, within } from "@testing-library/react";
import { TestIds } from "@tests/testIds";
import { AdventureFormFields } from "./helper/AdventureFormFields";

export class AdventureFormPageObject extends BasePage<AdventureFormProps> {
  private user: UserEvent;

  constructor(props: AdventureFormProps) {
    super(props);
    this.user = userEvent.setup();
  }

  render() {
    render(<AdventureForm {...this.props} />);
  }

  get title() {
    return screen.getByTestId(TestIds.adventureForm.fields.name);
  }

  isTitle(text: string) {
    return this.getTextFor(AdventureFormFields.Title, text) !== null;
  }

  get summary() {
    return screen.getByTestId(TestIds.adventureForm.fields.summary);
  }

  isSummary(text: string) {
    const textElement = this.getTextFor(
      AdventureFormFields.Summary,
      text.replaceAll("\n", " ")
    );
    return textElement && textElement.textContent === text;
  }

  get system() {
    return within(
      screen.getByTestId(TestIds.adventureForm.fields.system)
    ).getByRole("combobox");
  }

  isSystem(text: string) {
    return this.getTextFor(AdventureFormFields.System, text) !== null;
  }

  async selectList() {
    return screen.findByRole("listbox");
  }

  get series() {
    return within(
      screen.getByTestId(TestIds.adventureForm.fields.series)
    ).getByRole("combobox");
  }

  isSeries(text: string) {
    return this.getTextFor(AdventureFormFields.Series, text) !== null;
  }

  get language() {
    return within(
      screen.getByTestId(TestIds.adventureForm.fields.language)
    ).getByRole("combobox");
  }

  isLanguage(text: string) {
    return this.getTextFor(AdventureFormFields.Language, text) !== null;
  }

  get genres() {
    return screen.getByTestId(TestIds.adventureForm.fields.genres)
      .firstElementChild as HTMLElement;
  }

  isGenreShownAsSelected(name: string) {
    return within(this.genres).findByText(name) !== null;
  }

  get tags() {
    return screen.getByTestId(TestIds.adventureForm.fields.tags);
  }

  isTagShownAsSelected(name: string) {
    return within(this.tags).findByText(name) !== null;
  }

  get pageCount() {
    return screen.getByTestId(TestIds.adventureForm.fields.pageCount);
  }

  isPageCount(text: number | string) {
    return (
      this.getTextFor(AdventureFormFields.PageCount, text.toString()) !== null
    );
  }

  get minLevel() {
    return screen.getByTestId(TestIds.adventureForm.fields.minLevel);
  }

  isMinLevel(text: number | string) {
    return (
      this.getTextFor(AdventureFormFields.MinLevel, text.toString()) !== null
    );
  }

  get maxLevel() {
    return screen.getByTestId(TestIds.adventureForm.fields.maxLevel);
  }

  isMaxLevel(text: number | string) {
    return (
      this.getTextFor(AdventureFormFields.MaxLevel, text.toString()) !== null
    );
  }

  get image() {
    return screen.getByTestId(TestIds.adventureForm.fields.image);
  }

  isImageText(text: string) {
    return this.getTextFor(AdventureFormFields.Image, text) !== null;
  }

  get alreadyPlayed() {
    return screen.getByTestId(TestIds.adventureForm.fields.alreadyPlayed);
  }

  get submit() {
    return screen.getByTestId(TestIds.adventureForm.fields.submit);
  }

  async click(element: HTMLElement) {
    await this.user.click(element);
  }

  async typeInto(field: AdventureFormFields, text: number | string) {
    if (field === AdventureFormFields.Image) {
      await this.user.click(this.getInputFieldFor(field));
      await this.user.paste(text.toString());
    } else await this.user.type(this.getInputFieldFor(field), text.toString());
  }

  async clear(field: AdventureFormFields) {
    await this.user.clear(this.getInputFieldFor(field));
  }

  async select(field: AdventureFormFields, text: string) {
    let element: HTMLElement;
    switch (field) {
      case AdventureFormFields.Language:
        element = this.language;
        break;
      case AdventureFormFields.System:
        element = this.system;
        break;
      case AdventureFormFields.Series:
        element = this.series;
        break;

      case AdventureFormFields.Genres:
        element = this.genres;
        break;

      case AdventureFormFields.Summary:
      case AdventureFormFields.Tags:
      case AdventureFormFields.Title:
      case AdventureFormFields.Image:
      case AdventureFormFields.MinLevel:
      case AdventureFormFields.MaxLevel:
      case AdventureFormFields.PageCount:
        throw new Error(`${field} is no selection field`);
    }

    expect(element).toBeInTheDocument();
    await this.click(element);
    const selectionList = await this.selectList();
    expect(selectionList).toBeInTheDocument();
    const entry = within(selectionList).getByText(text);
    await this.click(entry);
  }

  async deselect(field: AdventureFormFields, text: string) {
    let element: HTMLElement;
    switch (field) {
      case AdventureFormFields.Genres:
        element = this.genres;
        break;

      case AdventureFormFields.Tags:
        element = this.tags;
        break;
      case AdventureFormFields.Summary:
      case AdventureFormFields.Language:
      case AdventureFormFields.System:
      case AdventureFormFields.Series:
      case AdventureFormFields.Title:
      case AdventureFormFields.Image:
      case AdventureFormFields.MinLevel:
      case AdventureFormFields.MaxLevel:
      case AdventureFormFields.PageCount:
        throw new Error(`${field} is no deselection field`);
    }

    expect(element).toBeInTheDocument();
    const buttons = within(element).getAllByRole("button");
    for (let i = 0; i < buttons.length; i += 1) {
      const button = buttons[i];
      const found = within(button).queryByText(text);
      if (found) {
        const cancelButton = within(button).getByTestId("CancelIcon");
        expect(cancelButton).toBeInTheDocument();
        this.click(cancelButton);
        await new Promise((resolve) => setTimeout(resolve, 200));
      }
    }
  }

  isDisabled(element: HTMLElement) {
    return element.className.includes("Mui-disabled");
  }

  isSelected(element: HTMLElement) {
    return element.className.includes("Mui-selected");
  }

  private getInputFieldFor(field: AdventureFormFields) {
    switch (field) {
      case AdventureFormFields.Image:
        return within(this.image).getByRole("textbox");
      case AdventureFormFields.MinLevel:
        return within(this.minLevel).getByRole("textbox");
      case AdventureFormFields.MaxLevel:
        return within(this.maxLevel).getByRole("textbox");
      case AdventureFormFields.PageCount:
        return within(this.pageCount).getByRole("textbox");
      case AdventureFormFields.Summary:
        return within(this.summary).getByRole("textbox");
      case AdventureFormFields.Tags:
        return within(this.tags).getByRole("combobox");
      case AdventureFormFields.Title:
        return within(this.title).getByRole("textbox");
      case AdventureFormFields.Genres:
      case AdventureFormFields.Language:
      case AdventureFormFields.System:
      case AdventureFormFields.Series:
        throw new Error(`${field} is no text input`);
    }
  }

  private getTextFor(field: AdventureFormFields, text: string) {
    switch (field) {
      case AdventureFormFields.Image:
        return within(this.image).queryByDisplayValue(text);
      case AdventureFormFields.Language:
        return within(this.language).queryByText(text);
      case AdventureFormFields.MinLevel:
        return within(this.minLevel).queryByDisplayValue(text);
      case AdventureFormFields.MaxLevel:
        return within(this.maxLevel).queryByDisplayValue(text);
      case AdventureFormFields.PageCount:
        return within(this.pageCount).queryByDisplayValue(text);
      case AdventureFormFields.Series:
        return within(this.series).queryByText(text);
      case AdventureFormFields.Summary:
        return within(this.summary).queryByRole("textbox");
      case AdventureFormFields.System:
        return within(this.system).queryByText(text);
      case AdventureFormFields.Title:
        return within(this.title).queryByDisplayValue(text);
    }
  }
}
