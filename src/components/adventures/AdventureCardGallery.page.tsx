import { render, screen, within } from "@testing-library/react";
import { TestIds } from "@tests/testIds";
import AdventureCardGallery, {
  AdventureCardGalleryProps,
} from "./AdventureCardGallery";
import { BasePage } from "@tests/pages/BasePage";

export class AdventureGalleryPageObject extends BasePage<AdventureCardGalleryProps> {
  constructor(props: AdventureCardGalleryProps) {
    super(props);
  }

  async render() {
    const gallery = await AdventureCardGallery(this.props);
    render(gallery);
  }

  get page() {
    return screen.queryByTestId(TestIds.adventureCardGallery);
  }

  get cards() {
    const gallery = this.page;
    if (gallery === null) return [];
    const cards = this.props.adventures.map((adventure) =>
      within(gallery).queryAllByTestId(TestIds.adventureCard.card(adventure.id))
    );

    return cards;
  }
}
