import { render, screen, within } from "@testing-library/react";
import SeriesGallery from "./SeriesGallery";
import { TestIds } from "@tests/testIds";
import { SeriesFull } from "@domain/models/series";
import { getDictionary } from "@dictionaries/helpers/getDictionaries";
import { defaultLocale } from "@dictionaries/helpers/locales";

export class SeriesGalleryPageObject {
  private series: SeriesFull[];
  constructor(series: SeriesFull[]) {
    this.series = series;
  }

  async render() {
    const props = {
      series: this.series,
      dictionary: await getDictionary(defaultLocale),
    };
    const gallery = await SeriesGallery(props);
    render(gallery);
  }

  async seriesEntries() {
    const promises: Promise<HTMLElement>[] = [];
    this.series.forEach((series) => {
      promises.push(
        screen.findByTestId(TestIds.seriesGallery.entry(series.name))
      );
    });
    return await Promise.all(promises);
  }

  async systemByText(seriesName: string, systemName: string) {
    const container = await screen.findByTestId(
      TestIds.seriesGallery.entry(seriesName)
    );
    return within(container).findByText(systemName);
  }

  async badgeByText(name: string) {
    const container = await screen.findByTestId(
      TestIds.seriesGallery.entry(name)
    );
    return within(container).findByTestId(TestIds.seriesGallery.badge(name));
  }

  async seriesButtonGroup(name: string) {
    const container = await screen.findByTestId(
      TestIds.seriesGallery.entry(name)
    );
    return within(container).findByTestId(TestIds.seriesButtonGroup.root(name));
  }

  get addSeriesButton() {
    return screen.getByTestId(TestIds.seriesGallery.addButton);
  }
}
