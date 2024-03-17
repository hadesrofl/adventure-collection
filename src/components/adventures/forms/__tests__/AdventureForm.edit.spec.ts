import { AdventureFormPageObject } from "../AdventureForm.page";
import { mockTags } from "@tests/mockData/mockTags";
import { mockGenres } from "@tests/mockData/mockGenres";
import { mockSystems } from "@tests/mockData/mockSystems";
import { AdventureFull } from "@domain/models/adventure";
import { mockAdventures } from "@tests/mockData/mockAdventures";
import { prismaMock } from "@tests/setup/prisma";
import { mockSeries } from "@tests/mockData/mockSeries";
import { seriesIncludes } from "@domain/models/series";
import { getDictionary } from "@dictionaries/helpers/getDictionaries";
import { act } from "@testing-library/react";
import ApiRoutes from "@app/api/apiRoutes";
import acceptAnythingForProperties from "@tests/helpers/acceptAnythingForProperties";
import sortStrings from "@tests/helpers/sortStrings";
import { mockFetch } from "@tests/mocks/fetch";
import { AdventureFormFields } from "../helper/AdventureFormFields";

describe("Adventure Form", () => {
  const initPage = (adventure: AdventureFull) => {
    const page = new AdventureFormPageObject({
      tagOptions: mockTags,
      genreOptions: mockGenres,
      systemOptions: mockSystems,
      adventure,
    });

    page.render();
    return page;
  };

  describe("edit", () => {
    it("renders all fields", async () => {
      const adventure = mockAdventures[0];
      prismaMock.series.findMany.mockResolvedValue(
        mockSeries.filter((series) => series.systemId === adventure.systemId)
      );
      const page = initPage(adventure);

      expect(prismaMock.series.findMany).toHaveBeenCalledWith({
        include: seriesIncludes,
        skip: undefined,
        take: undefined,
        where: { systemId: adventure.systemId },
      });
      expect(page.title).toBeInTheDocument();
      expect(page.isTitle(adventure.name)).toBe(true);

      expect(page.summary).toBeInTheDocument();
      expect(page.isSummary(adventure.summary)).toBe(true);

      expect(page.system).toBeInTheDocument();
      expect(page.isSystem(adventure.system.name)).toBe(true);

      expect(page.series).toBeInTheDocument();
      expect(
        page.isSeries(
          adventure.series?.name ??
            (await getDictionary("en")).AdventureForm.labels.none
        )
      ).toBe(true);

      expect(page.language).toBeInTheDocument();
      expect(page.isLanguage(adventure.language)).toBe(true);

      expect(page.genres).toBeInTheDocument();
      for (let i = 0; i < adventure.genres.length; i += 1) {
        const genre = adventure.genres[i];
        expect(page.isGenreShownAsSelected(genre.name)).toBe(true);
      }

      expect(page.tags).toBeInTheDocument();

      for (let i = 0; i < adventure.tags.length; i += 1) {
        const tag = adventure.tags[i];
        expect(page.isTagShownAsSelected(tag.name)).toBe(true);
      }

      expect(page.pageCount).toBeInTheDocument();
      expect(page.isPageCount(adventure.pageCount ?? "")).toBe(true);

      expect(page.minLevel).toBeInTheDocument();
      expect(page.isMinLevel(adventure.minLevel ?? "")).toBe(true);

      expect(page.maxLevel).toBeInTheDocument();
      expect(page.isMaxLevel(adventure.maxLevel ?? "")).toBe(true);

      expect(page.image).toBeInTheDocument();
      expect(page.isImageText(adventure.image ?? "")).toBe(true);

      expect(page.alreadyPlayed).toBeInTheDocument();

      expect(page.submit).toBeInTheDocument();
      expect(page.isDisabled(page.submit)).toBe(false);
    });

    it(
      "edits an adventure",
      async () => {
        const initialAdventure = mockAdventures[0];
        const expectedAdventure = {
          ...mockAdventures[1],
          minLevel: 2,
          maxLevel: 3,
        };
        const expectedSummary = expectedAdventure.summary
          .split(" ")
          .slice(0, 10) // we only take the first ten words to shorten the duration of the test
          .join(" ");
        const selectedSystem = expectedAdventure.system;
        const seriesOfSystem = mockSeries.filter(
          (series) => series.systemId === selectedSystem.id
        );
        expectedAdventure.series = seriesOfSystem[0];
        prismaMock.series.findMany.mockResolvedValue(seriesOfSystem);
        const page = initPage(initialAdventure);

        expect(page.isTitle(initialAdventure.name)).toBe(true);

        await act(async () => {
          await page.clear(AdventureFormFields.Title);
          await page.typeInto(
            AdventureFormFields.Title,
            expectedAdventure.name
          );
        });

        expect(page.isTitle(expectedAdventure.name)).toBe(true);
        expect(page.isSummary(initialAdventure.summary)).toBe(true);

        await act(async () => {
          await page.clear(AdventureFormFields.Summary);
          await page.typeInto(AdventureFormFields.Summary, expectedSummary);
        });

        expect(page.isSummary(expectedSummary)).toBe(true);

        await page.select(
          AdventureFormFields.System,
          expectedAdventure.system.name
        );
        expect(page.isSystem(expectedAdventure.system.name)).toBe(true);

        await page.select(
          AdventureFormFields.Series,
          expectedAdventure.series.name
        );
        expect(page.isSeries(expectedAdventure.series.name)).toBe(true);

        await page.select(
          AdventureFormFields.Language,
          expectedAdventure.language
        );
        expect(page.isLanguage(expectedAdventure.language)).toBe(true);

        await act(async () => {
          await page.clear(AdventureFormFields.PageCount);
          await page.typeInto(
            AdventureFormFields.PageCount,
            expectedAdventure.pageCount ?? ""
          );
        });

        expect(page.isPageCount(expectedAdventure.pageCount ?? ""));

        await act(async () => {
          await page.clear(AdventureFormFields.MinLevel);
          await page.typeInto(
            AdventureFormFields.MinLevel,
            expectedAdventure.minLevel ?? ""
          );
        });

        expect(page.isMinLevel(expectedAdventure.minLevel ?? ""));

        await act(async () => {
          await page.clear(AdventureFormFields.MaxLevel);
          await page.typeInto(
            AdventureFormFields.MaxLevel,
            expectedAdventure.maxLevel ?? ""
          );
        });

        expect(page.isMaxLevel(expectedAdventure.maxLevel ?? ""));

        for (let i = 0; i < initialAdventure.tags.length; i += 1) {
          const tag = initialAdventure.tags[i];
          await act(async () => {
            await page.deselect(AdventureFormFields.Tags, tag.name);
          });
        }

        for (let i = 0; i < expectedAdventure.tags.length; i += 1) {
          const tag = expectedAdventure.tags[i];
          await act(async () => {
            await page.typeInto(AdventureFormFields.Tags, tag.name);
            // wait for debounce to hit
            await new Promise((resolve) => setTimeout(resolve, 1000));
          });

          expect(
            page.isTagShownAsSelected(expectedAdventure.tags[i].name)
          ).toBe(true);
        }

        await act(async () => {
          await page.clear(AdventureFormFields.Image);
          await page.typeInto(
            AdventureFormFields.Image,
            expectedAdventure.image ?? ""
          );
        });

        expect(page.isImageText(expectedAdventure.image ?? ""));

        for (let i = 0; i < initialAdventure.genres.length; i += 1) {
          const genre = initialAdventure.genres[i];
          await act(async () => {
            await page.deselect(AdventureFormFields.Genres, genre.name);
          });
        }

        // Do this last because the click seems to break some queries
        for (let i = 0; i < expectedAdventure.genres.length; i += 1) {
          const genre = expectedAdventure.genres[i];
          await page.select(AdventureFormFields.Genres, genre.name);
          expect(
            page.isGenreShownAsSelected(expectedAdventure.genres[i].name)
          ).toBe(true);
        }

        expect(page.isDisabled(page.submit)).toBe(false);
        await page.click(page.submit);
        expect(mockFetch).toHaveBeenCalledWith(
          ApiRoutes.adventures.editAdventure(initialAdventure.id),
          {
            body: expect.stringContaining(expectedAdventure.name),
            method: "PUT",
          }
        );
        const request = mockFetch.mock.calls[0][1];
        expect(request.body).toBeDefined();
        expect(JSON.parse(request.body)).toStrictEqual({
          ...expectedAdventure,
          id: initialAdventure.id,
          summary: expectedSummary,
          createdAt: expect.anything(),
          updatedAt: expect.anything(),
          genres: expectedAdventure.genres
            .sort((g1, g2) => sortStrings(g1.name, g2.name))
            .map((genre) => acceptAnythingForProperties(genre, ["createdAt"])),
          seriesId: seriesOfSystem.find(
            (series) => series.name === expectedAdventure.series?.name
          )?.id,
          series: acceptAnythingForProperties(expectedAdventure.series, [
            "createdAt",
          ]),
          system: acceptAnythingForProperties(expectedAdventure.system, [
            "createdAt",
          ]),
          tags: expectedAdventure.tags
            .sort((t1, t2) => sortStrings(t1.name, t2.name))
            .map((tag) => acceptAnythingForProperties(tag, ["createdAt"])),
        });
      },
      30 * 1000
    );
  });
});
