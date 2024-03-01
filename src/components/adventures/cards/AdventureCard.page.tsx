import { render, screen, within } from "@testing-library/react";
import { TestIds } from "@tests/testIds";
import AdventureCard from "./AdventureCard";
import { getDictionary } from "@dictionaries/helpers/getDictionaries";
import {
  AdventureCardContentProps,
  createLevelRangeLabel,
} from "./cardContent/AdventureCardContent";
import { BasePage } from "@tests/pages/BasePage";
import userEvent, { UserEvent } from "@testing-library/user-event";
import { DeleteDialogButtonPage } from "@components/lib/buttons/DeleteDialogButton.page";

export class AdventureCardPageObject extends BasePage<AdventureCardContentProps> {
  private user: UserEvent;
  dialog: DeleteDialogButtonPage;

  constructor(props: AdventureCardContentProps) {
    super(props);
    this.user = userEvent.setup();
    this.dialog = new DeleteDialogButtonPage(
      "Delete Adventure",
      "Are you sure you want to delete the adventure?\n\nAdventure:",
      "Cancel",
      "Delete"
    );
  }

  render() {
    render(<AdventureCard {...this.props} />);
  }

  getCardOnPage() {
    return screen.queryByTestId(
      TestIds.adventureCard.card(this.props.adventure.id)
    );
  }

  get linkToDetailPage() {
    const card = this.getCardOnPage();
    if (card === null) return null;
    return within(card).queryByTestId(TestIds.adventureCard.primaryAction);
  }

  get image() {
    if (this.props.adventure.image === null) return null;
    const card = this.getCardOnPage();
    if (card === null) return null;
    const imageSrcEncoded = encodeURIComponent(this.props.adventure.image);

    const image = within(card).queryByRole("img");
    if (image?.getAttribute("src")?.includes(imageSrcEncoded)) return image;
    return null;
  }

  get title() {
    return this.getCardOnPage();
  }

  get system() {
    const card = this.getCardOnPage();
    if (card === null) return null;
    return within(card).queryByText(this.props.adventure.system.name);
  }

  get tags() {
    const card = this.getCardOnPage();
    if (card === null) return null;
    return card.querySelectorAll(".MuiChip-root");
  }

  get summary() {
    const card = this.getCardOnPage();
    if (card === null) return null;
    return within(card).queryByText(this.props.adventure.summary);
  }

  private async getLabel(label: string) {
    const card = this.getCardOnPage();
    if (card === null) return null;

    return within(card).queryByText(label);
  }

  async pageCountLabel() {
    const dictionary = await getDictionary("en");
    return this.getLabel(`${dictionary.AdventureCards.cardFront.pageCount}:`);
  }

  async pageCount() {
    if (this.props.adventure.pageCount === null) return null;
    const pageCountLabel = await this.pageCountLabel();

    if (
      pageCountLabel === null ||
      pageCountLabel.parentElement?.nextElementSibling === undefined ||
      pageCountLabel.parentElement?.nextElementSibling === null
    )
      return null;

    return within(
      pageCountLabel.parentElement?.nextElementSibling as HTMLElement
    ).queryByText(this.props.adventure.pageCount?.toString());
  }

  async levelsLabel() {
    const dictionary = await getDictionary("en");
    return this.getLabel(`${dictionary.AdventureCards.cardFront.levelRange}:`);
  }

  async levels() {
    if (
      this.props.adventure.minLevel === null &&
      this.props.adventure.maxLevel === null
    )
      return null;
    const levelsLabel = await this.levelsLabel();

    if (
      levelsLabel === null ||
      levelsLabel.parentElement?.nextElementSibling === undefined ||
      levelsLabel.parentElement?.nextElementSibling === null
    )
      return null;

    return within(
      levelsLabel.parentElement?.nextElementSibling as HTMLElement
    ).queryByText(createLevelRangeLabel(this.props.adventure));
  }

  get deleteButton() {
    const card = this.getCardOnPage();
    if (card === null) return null;
    return within(card).queryByTestId("DeleteIcon");
  }

  get editButton() {
    const card = this.getCardOnPage();
    if (card === null) return null;
    return within(card).queryByTestId("EditIcon");
  }

  async clickButton(button: "delete" | "edit") {
    const buttonToClick =
      button === "delete" ? this.deleteButton : this.editButton;

    if (buttonToClick === null)
      throw new Error(`Can't click on ${button} button`);

    this.user.click(buttonToClick);
  }

  async assertToBeInTheDocument() {
    if (this.props.adventure.image !== null)
      expect(this.image).toBeInTheDocument();

    expect(this.title).toBeInTheDocument();
    expect(this.system).toBeInTheDocument();

    const tags = this.tags;
    expect(tags?.length).toBe(this.props.adventure.tags.length);
    this.props.adventure.tags.forEach((tag, idx) => {
      if (tags !== null) within(tags[idx] as HTMLElement).queryByText(tag.name);
    });

    if (!this.props.showSummary) expect(this.summary).not.toBeInTheDocument();
    else expect(this.summary).toBeInTheDocument();

    if (!this.props.href) expect(this.linkToDetailPage).not.toBeInTheDocument();
    else expect(this.linkToDetailPage).toBeInTheDocument();

    expect(await this.pageCountLabel()).toBeInTheDocument();
    expect(await this.pageCount()).toBeInTheDocument();

    if (
      this.props.adventure.minLevel !== null &&
      this.props.adventure.maxLevel !== null
    ) {
      expect(await this.levelsLabel()).toBeInTheDocument();
      expect(await this.levels()).toBeInTheDocument();
    }

    expect(this.deleteButton).toBeInTheDocument();
    expect(this.editButton).toBeInTheDocument();
  }
}
