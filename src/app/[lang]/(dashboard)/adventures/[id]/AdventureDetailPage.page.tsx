import IdParamProps from "@app/_shared/idParam";
import { render } from "@testing-library/react";
import AdventureDetailPage from "./page";
import { BasePage } from "@tests/pages/BasePage";
import {
  StaticCardCarouselPageObject,
} from "@features/adventures/testExports";
import { mockAdventures } from "@tests/mockData/mockAdventures";

export class AdventureDetailPageObject extends BasePage<IdParamProps> {
  private carouselPage!: StaticCardCarouselPageObject;

  constructor(
    props: IdParamProps,
    previousCardHref: string | undefined = undefined,
    nextCardHref: string | undefined = undefined
  ) {
    super(props);
    const adventure = mockAdventures.find(
      (adventure) => Number.parseInt(this.props.params.id) === adventure.id
    );
    this.carouselPage = new StaticCardCarouselPageObject({
      adventure,
      previousCardHref,
      nextCardHref,
    });
  }

  async render() {
    const page = await AdventureDetailPage({ params: this.props.params });
    render(page);
  }

  get carousel() {
    return this.carouselPage;
  }
}
