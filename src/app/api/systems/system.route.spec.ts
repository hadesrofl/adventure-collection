/**
 * @jest-environment node
 */
import { createMocks } from "node-mocks-http";
import { GET, POST } from "./route";
import { prismaMock } from "@tests/setup/prisma";
import { ApiRequest, ApiResponse } from "@tests/mocks/fetch";
import { mockFullSeries } from "@tests/mockData/mockSeries";
import StatusCodes from "../_internal/shared/StatusCodes";
import { mockFullSystems } from "@tests/mockData/mockSystemsFull";
import { buildSystemDbStatement } from "@tests/helpers/buildSystemsDbStatement";
import { mockSystems } from "@tests/mockData/mockSystems";
import { systemIncludes } from "@features/systems";

jest.mock("next/cache");

describe("/systems routes", () => {
  describe("Post System", () => {
    it("posts system", async () => {
      // Arrange
      const system = mockFullSystems[0];
      system.name = "Bla blub";
      const body = { system };
      const { req } = createMocks<ApiRequest, ApiResponse>({
        method: "POST",
        body,
      });

      req.json = jest.fn().mockResolvedValue(body.system);

      // Act
      const response = await POST(req);

      // Assert
      const dbStatement = buildSystemDbStatement(system, system.adventures);
      expect(prismaMock.system.create).toHaveBeenCalledTimes(1);
      expect(prismaMock.system.create).toHaveBeenCalledWith({
        data: { ...dbStatement.data, id: undefined },
        include: dbStatement.include,
      });
      expect(response).toBeTruthy();
      expect(response.status).toBe(StatusCodes.Created);
    });

    it("posts system without adventures", async () => {
      // Arrange
      const system = mockSystems[0];
      system.name = "Bla blub";
      const body = { system };
      const { req } = createMocks<ApiRequest, ApiResponse>({
        method: "POST",
        body,
      });

      req.json = jest.fn().mockResolvedValue(body.system);

      // Act
      const response = await POST(req);

      // Assert
      const dbStatement = buildSystemDbStatement(system);
      expect(prismaMock.system.create).toHaveBeenCalledTimes(1);
      expect(prismaMock.system.create).toHaveBeenCalledWith({
        data: {
          ...dbStatement.data,
          adventures: { connect: [] },
          id: undefined,
        },
        include: dbStatement.include,
      });
      expect(response).toBeTruthy();
      expect(response.status).toBe(StatusCodes.Created);
    });

    it("handles error", async () => {
      // Arrange
      prismaMock.system.create.mockRejectedValue("Create failed");
      const system = mockFullSystems[0];
      const body = { system };
      const { req } = createMocks<ApiRequest, ApiResponse>({
        method: "POST",
        body,
      });

      req.json = jest.fn().mockResolvedValue(body.system);

      // Act
      const response = await POST(req);

      // Assert
      const dbStatement = buildSystemDbStatement(system, system.adventures);
      expect(prismaMock.system.create).toHaveBeenCalledTimes(1);
      expect(prismaMock.system.create).toHaveBeenCalledWith({
        data: { ...dbStatement.data, id: undefined },
        include: dbStatement.include,
      });
      expect(response).toBeTruthy();
      expect(await response.json()).toEqual({
        message: "Create failed",
        statusCode: StatusCodes.InternalServerError,
      });
      expect(response.status).toBe(StatusCodes.InternalServerError);
    });
  });

  describe("Get System", () => {
    it("gets all systems", async () => {
      // Arrange
      prismaMock.system.findMany.mockResolvedValue(mockFullSeries);

      // Act
      const response = await GET();

      // Assert
      expect(prismaMock.system.findMany).toHaveBeenCalledTimes(1);
      expect(prismaMock.system.findMany).toHaveBeenCalledWith({
        include: systemIncludes,
      });
      expect(response).toBeTruthy();
      expect(response.status).toBe(StatusCodes.OK);
    });

    it("handles error", async () => {
      // Arrange
      prismaMock.system.findMany.mockRejectedValue("Get failed");

      // Act
      const response = await GET();

      // Assert
      expect(prismaMock.system.findMany).toHaveBeenCalledTimes(1);
      expect(prismaMock.system.findMany).toHaveBeenCalledWith({
        include: systemIncludes,
      });
      expect(response).toBeTruthy();
      expect(await response.json()).toEqual({
        message: "Get failed",
        statusCode: StatusCodes.InternalServerError,
      });
      expect(response.status).toBe(StatusCodes.InternalServerError);
    });
  });
});
