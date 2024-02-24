import { render } from "@testing-library/react";
import AdventureCollectionPage from "./page";
import { AdventureGalleryPageObject } from "@components/adventures/AdventureCardGallery.page";
import { NoAdventureDialogPage } from "@components/adventures/dialogs/NoAdenture/NoAdventureDialog.page";

export class AdventureCollectionPageObject {
  private pageElement!: JSX.Element;
  gallery!: AdventureGalleryPageObject;
  noAdventureDialog!: NoAdventureDialogPage;

  async init() {
    this.pageElement = await AdventureCollectionPage();
    this.gallery = new AdventureGalleryPageObject({ adventures: [] });
    this.noAdventureDialog = new NoAdventureDialogPage();
  }

  async render() {
    if (this.pageElement === undefined) await this.init();
    render(this.pageElement);
  }
}
