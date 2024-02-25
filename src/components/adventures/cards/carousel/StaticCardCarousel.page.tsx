import { TestIds } from "@tests/testIds";
import { AdventureCardPageObject } from "../AdventureCard.page";
import StaticCardCarousel, {
  StaticCardCarouselProps,
} from "./StaticCardCarousel";
import { render, screen } from "@testing-library/react";
import { BasePage } from "@tests/pages/BasePage";

export class StaticCardCarouselPageObject extends BasePage<StaticCardCarouselProps> {
  private cardPage!: AdventureCardPageObject;

  constructor(props: StaticCardCarouselProps) {
    super(props);
    if (this.props.adventure)
      this.cardPage = new AdventureCardPageObject({
        adventure: this.props.adventure,
      });
  }

  render() {
    render(<StaticCardCarousel {...this.props} />);
  }

  get card() {
    return this.cardPage;
  }

  get previousCardButton() {
    return screen.queryByTestId(
      TestIds.adventureCardCarousel.buttons.previousCard
    );
  }

  get nextCardButton() {
    return screen.queryByTestId(TestIds.adventureCardCarousel.buttons.nextCard);
  }
}
