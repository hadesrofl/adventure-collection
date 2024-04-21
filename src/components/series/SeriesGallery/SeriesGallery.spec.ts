import { prismaMock } from "@tests/setup/prisma";
import { mockFullSeries } from "@tests/mockData/mockSeries";
import { SeriesGalleryPageObject } from "./SeriesGallery.page";
import { mockSystems } from "@tests/mockData/mockSystems";

describe("Series Gallery", () => {
  it("renders", async () => {
    // Arrange
    prismaMock.series.findMany
      .mockResolvedValueOnce(mockFullSeries)
      .mockResolvedValueOnce([mockFullSeries[1]]);
    prismaMock.system.findMany.mockResolvedValue(mockSystems);
    const page = new SeriesGalleryPageObject(mockFullSeries);

    // Act
    page.render();

    // Assert
    expect((await page.seriesEntries()).length).toBe(mockFullSeries.length);
    for (let i = 0; i < mockFullSeries.length; i += 1) {
      const series = mockFullSeries[i];
      expect(await page.seriesButtonGroup(series.name)).toBeInTheDocument();
      expect(page.addSeriesButton).toBeInTheDocument();
      expect(
        await page.systemByText(series.name, series.system.name)
      ).toBeInTheDocument();
      // we include the name here because the test id gives us the badge with the contained chip element and the tag name in it
      expect((await page.badgeByText(series.name)).textContent).toBe(
        `${series.name}${series.adventures.length}`
      );
    }
  });
});
