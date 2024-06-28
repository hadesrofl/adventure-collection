/**
 * @jest-environment node
 */
import { createMocks } from "node-mocks-http";
import { DELETE, PUT } from "./route";
import StatusCodes from "../../_internal/shared/StatusCodes";
import { prismaMock } from "@tests/setup/prisma";
import { ApiRequest, ApiResponse } from "@tests/mocks/fetch";
import { mockAdventures } from "@tests/mockData/mockAdventures";
import { mockFullSystems } from "@tests/mockData/mockSystemsFull";
import { buildSystemDbStatement } from "@tests/helpers/buildSystemsDbStatement";
import { systemIncludes } from "@features/systems";
import { Adventure } from "@domain/models/adventure";

jest.mock("next/cache");

describe("/systems/[id] routes", () => {
  describe("Update System", () => {
    it.each([
      [undefined, undefined],
      [[mockAdventures[0]], [mockAdventures[1]]],
    ])(
      "updates system",
      async (
        adventuresToDisconnect: Adventure[] | undefined,
        newAdventures: Adventure[] | undefined
      ) => {
        // Arrange
        const system = mockFullSystems[0];
        prismaMock.system.findFirstOrThrow.mockResolvedValue(
          JSON.parse(JSON.stringify(mockFullSystems[0]))
        );
        prismaMock.adventure.findMany.mockResolvedValue(system.adventures);

        newAdventures?.forEach((adventure) =>
          system.adventures.push(adventure)
        );

        system.adventures = !adventuresToDisconnect
          ? system.adventures
          : system.adventures.filter((adventure) =>
              adventuresToDisconnect.find(
                (adv) => adv.name !== adventure.name || adv.id !== adventure.id
              )
            );

        system.name = "Bla blub";
        const body = { system };
        const { req } = createMocks<ApiRequest, ApiResponse>({
          method: "PUT",
          body,
        });

        req.json = jest.fn().mockResolvedValue(body.system);

        // Act
        const response = await PUT(req);

        // Assert
        expect(prismaMock.system.update).toHaveBeenCalledTimes(1);
        expect(prismaMock.system.update).toHaveBeenCalledWith({
          where: { id: system.id },
          ...buildSystemDbStatement(
            system,
            newAdventures,
            adventuresToDisconnect
          ),
        });
        expect(response).toBeTruthy();
        expect(response.status).toBe(StatusCodes.NoContent);
      }
    );

    it("updates system but it stays the same", async () => {
      // Arrange
      const system = mockFullSystems[0];
      prismaMock.system.findFirstOrThrow.mockResolvedValue(system);
      prismaMock.adventure.findMany.mockResolvedValue(system.adventures);
      const body = { system };
      const { req } = createMocks<ApiRequest, ApiResponse>({
        method: "PUT",
        body,
      });

      req.json = jest.fn().mockResolvedValue(body.system);

      // Act
      const response = await PUT(req);

      // Assert
      expect(prismaMock.system.update).toHaveBeenCalledTimes(1);
      expect(prismaMock.system.update).toHaveBeenCalledWith({
        where: { id: system.id },
        ...buildSystemDbStatement(system),
      });
      expect(response).toBeTruthy();
      expect(response.status).toBe(StatusCodes.NoContent);
    });

    it("handles error", async () => {
      // Arrange
      prismaMock.system.update.mockRejectedValue("Update failed");
      const system = mockFullSystems[0];
      prismaMock.system.findFirstOrThrow.mockResolvedValue(system);
      prismaMock.adventure.findMany.mockResolvedValue(system.adventures);
      const body = { system };
      const { req } = createMocks<ApiRequest, ApiResponse>({
        method: "PUT",
        body,
      });

      req.json = jest.fn().mockResolvedValue(body.system);

      // Act
      const response = await PUT(req);

      // Assert
      expect(prismaMock.system.update).toHaveBeenCalledTimes(1);
      expect(prismaMock.system.update).toHaveBeenCalledWith({
        where: { id: system.id },
        ...buildSystemDbStatement(system),
      });
      expect(response).toBeTruthy();
      expect(await response.json()).toEqual({
        message: "Update failed",
        statusCode: StatusCodes.InternalServerError,
      });
      expect(response.status).toBe(StatusCodes.InternalServerError);
    });
  });

  describe("Deletes System", () => {
    it("deletes system", async () => {
      // Arrange
      const system = mockFullSystems[0];
      const params = { params: { id: `${system.id}` } };
      prismaMock.adventure.findMany.mockResolvedValue(
        mockAdventures.filter(
          (adventure) => adventure.series?.name === system.name
        )
      );
      const { req } = createMocks<ApiRequest, ApiResponse>({
        method: "DELETE",
      });

      // Act
      const response = await DELETE(req, params);

      // Assert
      expect(prismaMock.system.delete).toHaveBeenCalledTimes(1);
      expect(prismaMock.system.delete).toHaveBeenCalledWith({
        include: systemIncludes,
        where: { id: system.id },
      });
      expect(response).toBeTruthy();
      expect(response.status).toBe(StatusCodes.NoContent);
    });

    it("handles error", async () => {
      // Arrange
      prismaMock.system.delete.mockRejectedValue("Delete failed");
      const system = mockFullSystems[0];
      prismaMock.adventure.findMany.mockResolvedValue(
        mockAdventures.filter(
          (adventure) => adventure.series?.name === system.name
        )
      );
      const params = { params: { id: `${system.id}` } };
      const { req } = createMocks<ApiRequest, ApiResponse>({
        method: "DELETE",
      });

      // Act
      const response = await DELETE(req, params);

      // Assert
      expect(prismaMock.system.delete).toHaveBeenCalledTimes(1);
      expect(prismaMock.system.delete).toHaveBeenCalledWith({
        include: systemIncludes,
        where: { id: system.id },
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
