/**
 * @jest-environment node
 */
import { createMocks } from "node-mocks-http";
import { GET, POST } from "./route";
import StatusCodes from "../_internal/shared/StatusCodes";
import { prismaMock } from "@tests/setup/prisma";
import { ApiRequest, ApiResponse } from "@tests/mocks/fetch";
import { mockAdventures } from "@tests/mockData/mockAdventures";
import { createAdventureResponse } from "@tests/mocks/helper/createAdventureResponse";
import { buildAdventure } from "@domain/factories/AdventureFactory";
import { AdventureFull, adventureIncludes } from "@domain/models/adventure";

jest.mock("next/cache");

describe("/adventures/[id]", () => {
  describe("Get all adventures", () => {
    it("get all adventures", async () => {
      prismaMock.adventure.findMany.mockResolvedValue(mockAdventures);

      const response = await GET();

      expect(prismaMock.adventure.findMany).toHaveBeenCalledTimes(1);
      expect(prismaMock.adventure.findMany).toHaveBeenCalledWith({
        where: undefined,
        skip: undefined,
        take: undefined,
        include: adventureIncludes,
      });
      expect(response).toBeTruthy();
      expect(await response.json()).toEqual(
        mockAdventures.map((adventure) => {
          return createAdventureResponse(adventure);
        })
      );
      expect(response.status).toBe(StatusCodes.OK);
    });

    it("handles error", async () => {
      prismaMock.adventure.findMany.mockRejectedValue(
        "Couldn't get all adventures"
      );

      const response = await GET();

      expect(prismaMock.adventure.findMany).toHaveBeenCalledTimes(1);
      expect(prismaMock.adventure.findMany).toHaveBeenCalledWith({
        where: undefined,
        skip: undefined,
        take: undefined,
        include: adventureIncludes,
      });
      expect(response).toBeTruthy();
      expect(await response.json()).toEqual({
        message: "Couldn't get all adventures",
        statusCode: StatusCodes.InternalServerError,
      });
      expect(response.status).toBe(StatusCodes.InternalServerError);
    });
  });

  describe("Create Adventure", () => {
    it("creates new adventure", async () => {
      const adventure: AdventureFull = buildAdventure(
        "What hurts?",
        "I can't remember",
        0,
        { id: 0, name: "", createdAt: new Date(Date.now()) },
        [],
        [],
        "English"
      );
      const body = { adventure };
      const { req } = createMocks<ApiRequest, ApiResponse>({
        method: "POST",
        body,
      });
      prismaMock.adventure.create.mockResolvedValue({ ...adventure, id: 3 });
      req.json = jest.fn().mockResolvedValue(body.adventure);

      const response = await POST(req);

      expect(prismaMock.adventure.create).toHaveBeenCalledTimes(1);
      expect(prismaMock.adventure.create).toHaveBeenCalledWith({
        data: {
          ...adventure,
          id: undefined,
          tags: {
            connectOrCreate: adventure.tags.map((tag) => {
              return { where: { name: tag.name }, create: { name: tag.name } };
            }),
          },
          genres: {
            connect: adventure.genres.map((genre) => {
              return {
                where: { name: genre.name },
                create: { name: genre.name },
              };
            }),
          },
          series: undefined,
          seriesId: undefined,
          system: undefined,
        },

        include: adventureIncludes,
      });
      expect(response).toBeTruthy();
      expect(response.status).toBe(StatusCodes.Created);
    });

    it("handles error", async () => {
      prismaMock.adventure.create.mockRejectedValue(
        "Error while creating new adventure"
      );
      const adventure: AdventureFull = buildAdventure(
        "What hurts?",
        "I can't remember",
        0,
        { id: 0, name: "", createdAt: new Date(Date.now()) },
        [],
        [],
        "English"
      );
      const body = { adventure };
      const { req } = createMocks<ApiRequest, ApiResponse>({
        method: "POST",
        body,
      });
      req.json = jest.fn().mockResolvedValue(body.adventure);

      const response = await POST(req);

      expect(prismaMock.adventure.create).toHaveBeenCalledTimes(1);
      expect(prismaMock.adventure.create).toHaveBeenCalledWith({
        data: {
          ...adventure,
          id: undefined,
          tags: {
            connectOrCreate: adventure.tags.map((tag) => {
              return { where: { name: tag.name }, create: { name: tag.name } };
            }),
          },
          genres: {
            connect: adventure.genres.map((genre) => {
              return {
                where: { name: genre.name },
                create: { name: genre.name },
              };
            }),
          },
          series: undefined,
          seriesId: undefined,
          system: undefined,
        },

        include: adventureIncludes,
      });
      expect(response).toBeTruthy();
      expect(await response.json()).toEqual({
        message: "Error while creating new adventure",
        statusCode: StatusCodes.InternalServerError,
      });
      expect(response.status).toBe(StatusCodes.InternalServerError);
    });
  });
});
