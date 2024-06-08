import { AdventureFormPageObject } from "../AdventureForm.page";
import { mockTags } from "@tests/mockData/mockTags";
import { mockGenres } from "@tests/mockData/mockGenres";
import { mockSystems } from "@tests/mockData/mockSystems";
import { act, screen, waitFor, within } from "@testing-library/react";
import { mockSeries } from "@tests/mockData/mockSeries";
import { prismaMock } from "@tests/setup/prisma";
import { seriesIncludes } from "@features/series";
import { Language } from "@prisma/client";
import { TreeNode } from "../../../utils/TreeNode";
import PrintableGenre from "../../../utils/printableGenre";
import { mockFetch } from "@tests/mocks/fetch";
import ApiRoutes from "@routes/apiRoutes";
import acceptAnythingForProperties from "@tests/helpers/acceptAnythingForProperties";
import sortStrings from "@tests/helpers/sortStrings";
import { AdventureFormFields } from "../helper/AdventureFormFields";
import { createGenreSubtree } from "../../../utils/getSubgenres";
import { mockAdventures } from "@tests/mockData/mockAdventures";

describe("Adventure Form", () => {
  const initPage = () => {
    const page = new AdventureFormPageObject({
      tagOptions: mockTags,
      genreOptions: mockGenres,
      systemOptions: mockSystems,
    });

    page.render();
    return page;
  };

  describe("create", () => {
    it("renders all fields", async () => {
      const page = initPage();

      expect(page.title).toBeInTheDocument();
      expect(page.summary).toBeInTheDocument();
      expect(page.system).toBeInTheDocument();
      expect(page.series).toBeInTheDocument();
      expect(page.language).toBeInTheDocument();
      expect(page.genres).toBeInTheDocument();
      expect(page.tags).toBeInTheDocument();
      expect(page.pageCount).toBeInTheDocument();
      expect(page.minLevel).toBeInTheDocument();
      expect(page.maxLevel).toBeInTheDocument();
      expect(page.image).toBeInTheDocument();
      expect(page.alreadyPlayed).toBeInTheDocument();
      expect(page.submit).toBeInTheDocument();
    });

    it("loads systems", async () => {
      const page = initPage();

      const systemElement = page.system;
      if (!systemElement) throw new Error("System selection can't be null");
      expect(systemElement).not.toBeNull();
      expect(systemElement).toBeInTheDocument();

      await act(async () => {
        await page.click(systemElement);
      });
      const selectionList = await page.selectList();

      expect(selectionList).not.toBeNull();
      expect(selectionList).toBeInTheDocument();

      if (selectionList === null)
        throw new Error("System selection list should be shown");

      expect(within(selectionList).queryAllByRole("option").length).toBe(
        mockSystems.length
      );

      mockSystems.forEach((system) => {
        expect(
          within(selectionList).queryByText(system.name)
        ).toBeInTheDocument();
      });
    });

    it("loads series", async () => {
      const selectedSystem = mockSystems[0];
      const seriesOfSystem = mockSeries.filter(
        (series) => series.systemId === selectedSystem.id
      );
      prismaMock.series.findMany.mockResolvedValue(seriesOfSystem);
      const page = initPage();

      const seriesElement = page.series;
      if (!seriesElement) throw new Error("Series selection can't be null");
      expect(seriesElement).not.toBeNull();
      expect(seriesElement).toBeInTheDocument();
      expect(page.isDisabled(seriesElement)).toBe(true);

      await act(async () => {
        await page.click(page.system);
      });

      const firstSystem = await within(await page.selectList()).findByRole(
        "option",
        {
          name: selectedSystem.name,
        }
      );

      await act(async () => {
        await page.click(firstSystem);
      });

      await waitFor(() => {
        expect(prismaMock.series.findMany).toHaveBeenCalledWith({
          include: seriesIncludes,
          skip: undefined,
          take: undefined,
          where: { systemId: selectedSystem.id },
        });
      });
      expect(page.isDisabled(page.series)).toBe(false);

      await act(async () => {
        await page.click(seriesElement);
      });

      const selectionList = await page.selectList();

      await waitFor(() => {
        expect(selectionList).not.toBeNull();
        expect(selectionList).toBeInTheDocument();
      });

      if (selectionList === null)
        throw new Error("Series selection list should be shown");

      expect(within(selectionList).queryAllByRole("option").length).toBe(
        seriesOfSystem.length + 1 // "none" is a default option
      );

      seriesOfSystem.forEach((series) => {
        expect(
          within(selectionList).queryByText(series.name)
        ).toBeInTheDocument();
      });
    });

    it("loads genres", async () => {
      const page = initPage();

      const genresElement = page.genres;
      if (!genresElement) throw new Error("Genre selection can't be null");
      expect(genresElement).not.toBeNull();
      expect(genresElement).toBeInTheDocument();

      await act(async () => {
        await page.click(genresElement);
      });

      const selectionList = await page.selectList();

      expect(selectionList).not.toBeNull();
      expect(selectionList).toBeInTheDocument();

      if (selectionList === null)
        throw new Error("Genre selection list should be shown");

      const genreTree: TreeNode<PrintableGenre>[] = [];
      mockGenres.forEach((genre) => {
        genreTree.push(createGenreSubtree(genre, mockGenres));
      });

      const parents = genreTree.filter((node) => node.children.length !== 0);
      const children = genreTree.filter((node) => node.children.length === 0);
      const childElements = within(selectionList).queryAllByRole("menuitem");
      expect(within(selectionList).queryAllByRole("menuitem").length).toBe(
        children.length
      );

      parents.forEach((parent) => {
        expect(
          within(selectionList).getByText(parent.self.name)
        ).toBeInTheDocument();
        childElements.forEach((childElement) =>
          expect(within(childElement).queryByText(parent.self.name)).toBeNull()
        );
      });

      mockGenres.forEach((genre) => {
        expect(
          within(selectionList).queryByText(genre.name)
        ).toBeInTheDocument();
      });
    });

    it("preselects language", async () => {
      const languages = Object.keys(Language);
      const page = initPage();

      const languageElement = page.language;
      if (!languageElement) throw new Error("Language selection can't be null");
      expect(languageElement).not.toBeNull();
      expect(languageElement).toBeInTheDocument();

      await act(async () => {
        await page.click(languageElement);
      });

      const selectionList = await page.selectList();

      expect(selectionList).not.toBeNull();
      expect(selectionList).toBeInTheDocument();

      if (selectionList === null)
        throw new Error("Language selection list should be shown");

      expect(within(selectionList).queryAllByRole("option").length).toBe(
        languages.length
      );

      for (let i = 0; i < languages.length; i += 1) {
        const language = languages[i];
        expect(within(selectionList).queryByText(language)).toBeInTheDocument();
        expect(
          page.isSelected(await within(selectionList).findByText(language))
        ).toBe(language === Language.English);
      }
    });

    it(
      "creates a new adventure",
      async () => {
        const expectedAdventure = mockAdventures[0];
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
        const page = initPage();

        await act(async () => {
          await page.typeInto(
            AdventureFormFields.Title,
            expectedAdventure.name
          );
        });

        expect(page.isTitle(expectedAdventure.name)).toBe(true);

        await act(async () => {
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
          await page.typeInto(
            AdventureFormFields.PageCount,
            expectedAdventure.pageCount ?? ""
          );
        });

        expect(page.isPageCount(expectedAdventure.pageCount ?? ""));

        await act(async () => {
          await page.typeInto(
            AdventureFormFields.MinLevel,
            expectedAdventure.minLevel ?? ""
          );
        });

        expect(page.isMinLevel(expectedAdventure.minLevel ?? ""));

        await act(async () => {
          await page.typeInto(
            AdventureFormFields.MaxLevel,
            expectedAdventure.maxLevel ?? ""
          );
        });

        expect(page.isMaxLevel(expectedAdventure.maxLevel ?? ""));

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
          await page.typeInto(
            AdventureFormFields.Image,
            expectedAdventure.image ?? ""
          );
        });

        expect(page.isImageText(expectedAdventure.image ?? ""));

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
          ApiRoutes.adventures.createAdventure(),
          {
            body: expect.stringContaining(expectedAdventure.name),
            method: "POST",
          }
        );
        const request = mockFetch.mock.calls[0][1];
        expect(request.body).toBeDefined();
        expect(JSON.parse(request.body)).toStrictEqual({
          ...expectedAdventure,
          summary: expectedSummary,
          createdAt: expect.anything(),
          updatedAt: expect.anything(),
          genres: expectedAdventure.genres
            .sort((g1, g2) => sortStrings(g1.name, g2.name))
            .map((genre) => acceptAnythingForProperties(genre, ["createdAt"])),
          id: 0,
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

    it("validates", async () => {
      const expectedAdventure = mockAdventures[0];
      const titleNotEmptyValidationError = '"Title" is not allowed to be empty';
      const summaryNotEmptyValidationError =
        '"Summary" is not allowed to be empty';
      const systemNotEmptyValidationError =
        '"System Id" must be greater than 0';
      const imageRegexValidationError =
        '"Image" does not match the regular expression: /https:\\/\\/(www.)?system-matters.de\\/(.+|\\/)*(\\w|\\d)+\\.(png|jpeg|jpg|bmp)/';
      const maxLevelGreaterThanMinLevelValidationError =
        '"Max Level" must be equal or greater than minLevel';
      const validationErrorTexts = [
        titleNotEmptyValidationError,
        summaryNotEmptyValidationError,
        systemNotEmptyValidationError,
        imageRegexValidationError,
        maxLevelGreaterThanMinLevelValidationError,
      ];
      const page = initPage();

      await act(async () => {
        await page.typeInto(AdventureFormFields.MinLevel, 5);
        await page.typeInto(AdventureFormFields.MaxLevel, 3);
        await page.typeInto(AdventureFormFields.Image, "a");
      });

      expect(page.isTitle(expectedAdventure.name)).toBe(false);
      expect(page.isSummary(expectedAdventure.summary)).toBe(false);
      expect(page.isSystem(expectedAdventure.system.name)).toBe(false);
      expect(page.isMinLevel(expectedAdventure.minLevel ?? 0)).toBe(false);
      expect(page.isMaxLevel(expectedAdventure.maxLevel ?? 0)).toBe(false);
      expect(page.isImageText(expectedAdventure.image ?? "")).toBe(false);

      validationErrorTexts.forEach((errorText) => {
        expect(screen.getByText(errorText)).toBeInTheDocument();
      });
    });

    // TODO: What happens in error cases, e.g. data couldn't be loaded?
  });
});
