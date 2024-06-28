import { render, screen, within } from "@testing-library/react";
import SystemGallery from "./SystemGallery";
import { TestIds } from "@tests/testIds";
import { getDictionary } from "@dictionaries/helpers/getDictionaries";
import { defaultLocale } from "@dictionaries/helpers/locales";
import { SystemFull } from "@features/systems";

export class SystemGalleryPageObject {
  private systems: SystemFull[];
  constructor(systems: SystemFull[]) {
    this.systems = systems;
  }

  async render() {
    const props = {
      systems: this.systems,
      dictionary: await getDictionary(defaultLocale),
    };
    const gallery = await SystemGallery(props);
    render(gallery);
  }

  async systemEntries() {
    const promises: Promise<HTMLElement>[] = [];
    this.systems.forEach((system) => {
      promises.push(
        screen.findByTestId(TestIds.systemGallery.entry(system.name))
      );
    });
    return await Promise.all(promises);
  }

  async systemByText(systemName: string) {
    return await screen.findByTestId(TestIds.systemGallery.entry(systemName));
  }

  async adventureCountByText(name: string) {
    const container = await screen.findByTestId(
      TestIds.systemGallery.entry(name)
    );
    return within(container).findByTestId(
      TestIds.systemGallery.adventureCount(name)
    );
  }

  async systemButtonGroup(name: string) {
    const container = await screen.findByTestId(
      TestIds.systemGallery.entry(name)
    );
    return within(container).findByTestId(TestIds.systemButtonGroup.root(name));
  }

  get addSystemButton() {
    return screen.getByTestId(TestIds.systemGallery.addButton);
  }
}
