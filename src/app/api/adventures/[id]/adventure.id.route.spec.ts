/**
 * @jest-environment node
 */
import { createMocks } from "node-mocks-http";
import { GET, PUT, DELETE } from "./route";
import StatusCodes from "../../_internal/shared/StatusCodes";
import { prismaMock } from "@tests/setup/prisma";
import { ApiRequest, ApiResponse } from "@tests/mocks/fetch";
import { Tag } from "@prisma/client";
import {
  buildAdventure,
  AdventureFull,
  adventureIncludes,
} from "@features/adventures";
import { createAdventureResponse } from "@tests/mocks/helper/createAdventureResponse";
import { Genre } from "@features/genres";
import { mockAdventures } from "@tests/mockData/mockAdventures";

jest.mock("next/cache");

function removeRelationsFromAdventure(adventure: AdventureFull) {
  return [adventure].map(({ id, system, series, ...rest }) => rest)[0];
}

describe("/adventures routes", () => {
  const defaultAdventure = mockAdventures[0];
  describe("Get adventures", () => {
    it("get an adventure", async () => {
      prismaMock.adventure.findFirstOrThrow.mockResolvedValue(defaultAdventure);
      const { req } = createMocks<ApiRequest>({
        method: "GET",
      });

      const response = await GET(req, {
        params: {
          id: defaultAdventure.id.toString(),
        },
      });

      expect(prismaMock.adventure.findFirstOrThrow).toHaveBeenCalledTimes(1);
      expect(prismaMock.adventure.findFirstOrThrow).toHaveBeenCalledWith({
        where: { id: defaultAdventure.id },
        include: adventureIncludes,
      });
      expect(response).toBeTruthy();
      expect(await response.json()).toEqual(
        createAdventureResponse(defaultAdventure)
      );
      expect(response.status).toBe(StatusCodes.OK);
    });

    it("handles error", async () => {
      prismaMock.adventure.findFirstOrThrow.mockRejectedValue(
        "Couldn't get adventure"
      );

      const { req } = createMocks<ApiRequest>({
        method: "GET",
      });

      const response = await GET(req, {
        params: {
          id: defaultAdventure.id.toString(),
        },
      });

      expect(prismaMock.adventure.findFirstOrThrow).toHaveBeenCalledTimes(1);
      expect(prismaMock.adventure.findFirstOrThrow).toHaveBeenCalledWith({
        where: { id: defaultAdventure.id },
        include: adventureIncludes,
      });
      expect(response).toBeTruthy();
      expect(await response.json()).toEqual({
        message: "Couldn't get adventure",
        statusCode: StatusCodes.InternalServerError,
      });
      expect(response.status).toBe(StatusCodes.InternalServerError);
    });
  });

  describe("Edit Adventure", () => {
    it("edits adventure", async () => {
      const adventure: AdventureFull = buildAdventure(
        "What hurts?",
        "I can't remember",
        0,
        { id: 0, name: "", createdAt: new Date(Date.now()) },
        defaultAdventure.genres,
        defaultAdventure.tags,
        "English"
      );
      const body = {
        ...adventure,
      };
      const tagsToDelete: Tag[] = [];
      const genresToDelete: Genre[] = [];

      prismaMock.adventure.findFirst.mockResolvedValue(defaultAdventure);
      const { req } = createMocks<ApiRequest, ApiResponse>({
        method: "PUT",
        body,
      });
      prismaMock.adventure.update.mockResolvedValue({
        ...adventure,
      });

      req.json = jest.fn().mockResolvedValue(body);

      const response = await PUT(req);

      expect(prismaMock.adventure.update).toHaveBeenCalledTimes(1);
      expect(prismaMock.adventure.update).toHaveBeenCalledWith({
        where: { id: adventure.id },
        data: {
          ...removeRelationsFromAdventure(adventure),
          tags: {
            connectOrCreate: adventure.tags.map((tag) => {
              return {
                where: { id: tag.id },
                create: { name: tag.name },
              };
            }),
            disconnect: tagsToDelete,
          },
          genres: {
            connectOrCreate: adventure.genres.map((genre) => {
              return {
                where: { id: genre.id },
                create: { name: genre.name },
              };
            }),
            disconnect: genresToDelete,
          },
        },
        include: adventureIncludes,
      });
      expect(response).toBeTruthy();
      expect(response.status).toBe(StatusCodes.NoContent);
    });

    it("deletes tags", async () => {
      const removedTag = defaultAdventure.tags[0];
      const adventure: AdventureFull = buildAdventure(
        "What hurts?",
        "I can't remember",
        0,
        { id: 0, name: "", createdAt: new Date(Date.now()) },
        defaultAdventure.genres,
        defaultAdventure.tags.filter((tag) => tag !== removedTag),
        "English"
      );
      const body = {
        ...adventure,
      };
      const tagsToDelete: Tag[] = [removedTag];
      const genresToDelete: Genre[] = [];

      prismaMock.adventure.findFirst.mockResolvedValue(defaultAdventure);
      const { req } = createMocks<ApiRequest, ApiResponse>({
        method: "PUT",
        body,
      });
      prismaMock.adventure.update.mockResolvedValue({
        ...adventure,
      });

      req.json = jest.fn().mockResolvedValue(body);

      const response = await PUT(req);

      expect(prismaMock.adventure.update).toHaveBeenCalledTimes(1);
      expect(prismaMock.adventure.update).toHaveBeenCalledWith({
        where: { id: adventure.id },
        data: {
          ...removeRelationsFromAdventure(adventure),
          tags: {
            connectOrCreate: adventure.tags
              .filter((tag) => tag !== removedTag)
              .map((tag) => {
                return {
                  where: { id: tag.id },
                  create: { name: tag.name },
                };
              }),
            disconnect: tagsToDelete,
          },
          genres: {
            connectOrCreate: adventure.genres.map((genre) => {
              return {
                where: { id: genre.id },
                create: { name: genre.name },
              };
            }),
            disconnect: genresToDelete,
          },
        },
        include: adventureIncludes,
      });
      expect(response).toBeTruthy();
      expect(response.status).toBe(StatusCodes.NoContent);
    });

    it("can not find the previous entry", async () => {
      const adventure: AdventureFull = buildAdventure(
        "What hurts?",
        "I can't remember",
        0,
        { id: 0, name: "", createdAt: new Date(Date.now()) },
        defaultAdventure.genres,
        defaultAdventure.tags.slice(1, defaultAdventure.tags.length - 1),
        "English"
      );
      const body = {
        ...adventure,
      };
      const tagsToDelete: Tag[] = [];
      const genresToDelete: Genre[] = [];

      const { req } = createMocks<ApiRequest, ApiResponse>({
        method: "PUT",
        body,
      });
      prismaMock.adventure.update.mockResolvedValue({
        ...adventure,
      });
      req.json = jest.fn().mockResolvedValue(body);

      const response = await PUT(req);

      expect(prismaMock.adventure.update).toHaveBeenCalledTimes(1);
      expect(prismaMock.adventure.update).toHaveBeenCalledWith({
        where: { id: adventure.id },
        data: {
          ...removeRelationsFromAdventure(adventure),
          tags: {
            connectOrCreate: adventure.tags.map((tag) => {
              return {
                where: { id: tag.id },
                create: { name: tag.name },
              };
            }),
            disconnect: tagsToDelete,
          },
          genres: {
            connectOrCreate: adventure.genres.map((genre) => {
              return {
                where: { id: genre.id },
                create: { name: genre.name },
              };
            }),
            disconnect: genresToDelete,
          },
        },
        include: adventureIncludes,
      });
      expect(response).toBeTruthy();
      expect(response.status).toBe(StatusCodes.NoContent);
    });

    it("handles error", async () => {
      prismaMock.adventure.findFirst.mockResolvedValue(defaultAdventure);
      prismaMock.adventure.update.mockRejectedValue(
        "Error while editing an adventure"
      );
      const tagsToDelete: Tag[] = defaultAdventure.tags;
      const genresToDelete: Genre[] = defaultAdventure.genres;
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
        method: "PUT",
        body,
      });
      req.json = jest.fn().mockResolvedValue(body.adventure);

      const response = await PUT(req);

      expect(prismaMock.adventure.update).toHaveBeenCalledTimes(1);
      expect(prismaMock.adventure.update).toHaveBeenCalledWith({
        where: { id: adventure.id },
        data: {
          ...removeRelationsFromAdventure(adventure),
          seriesId: null,
          systemId: 0,
          tags: {
            connectOrCreate: adventure.tags.map((tag) => {
              return { where: { name: tag.name }, create: { name: tag.name } };
            }),
            disconnect: tagsToDelete,
          },
          genres: {
            connectOrCreate: adventure.genres.map((genre) => {
              return {
                where: { id: genre.id },
                create: { name: genre.name },
              };
            }),
            disconnect: genresToDelete,
          },
        },
        include: adventureIncludes,
      });
      expect(response).toBeTruthy();
      expect(await response.json()).toEqual({
        message: "Error while editing an adventure",
        statusCode: StatusCodes.InternalServerError,
      });
      expect(response.status).toBe(StatusCodes.InternalServerError);
    });
  });

  describe("Deletes adventure", () => {
    it("deletes adventure", async () => {
      const adventure = mockAdventures[0];
      const params = { params: { id: `${adventure.id}` } };

      const { req } = createMocks<ApiRequest, ApiResponse>({
        method: "DELETE",
      });
      prismaMock.adventure.delete.mockResolvedValue(adventure);

      const response = await DELETE(req, params);

      expect(prismaMock.adventure.delete).toHaveBeenCalledTimes(1);
      expect(prismaMock.adventure.delete).toHaveBeenCalledWith({
        where: { id: adventure.id },
        include: adventureIncludes,
      });
      expect(response).toBeTruthy();
      expect(response.status).toBe(StatusCodes.NoContent);
    });

    it("handles error", async () => {
      prismaMock.adventure.delete.mockRejectedValue("Delete failed");
      const adventure = mockAdventures[0];
      const params = { params: { id: `${adventure.id}` } };
      const { req } = createMocks<ApiRequest, ApiResponse>({
        method: "DELETE",
      });

      const response = await DELETE(req, params);

      expect(prismaMock.adventure.delete).toHaveBeenCalledTimes(1);
      expect(prismaMock.adventure.delete).toHaveBeenCalledWith({
        where: { id: adventure.id },
        include: adventureIncludes,
      });
      expect(response).toBeTruthy();
      expect(await response.json()).toEqual({
        message: "Delete failed",
        statusCode: StatusCodes.InternalServerError,
      });
      expect(response.status).toBe(StatusCodes.InternalServerError);
    });
  });
});
