/**
 * @jest-environment node
 */
import { createMocks } from "node-mocks-http";
import { GET, POST } from "./route";
import { prismaMock } from "@tests/setup/prisma";
import { ApiRequest, ApiResponse } from "@tests/mocks/fetch";
import { mockFullSeries, mockSeries } from "@tests/mockData/mockSeries";
import { seriesIncludes } from "@features/series";
import { buildSeriesDbStatement } from "@tests/helpers/buildSeriesDbStatement";
import StatusCodes from "../_internal/shared/StatusCodes";

jest.mock("next/cache");

describe("/series routes", () => {
  describe("Post Series", () => {
    it("posts series", async () => {
      // Arrange
      const series = mockFullSeries[0];
      series.name = "Bla blub";
      const body = { series };
      const { req } = createMocks<ApiRequest, ApiResponse>({
        method: "POST",
        body,
      });

      req.json = jest.fn().mockResolvedValue(body.series);

      // Act
      const response = await POST(req);

      // Assert
      const dbStatement = buildSeriesDbStatement(series, series.adventures);
      expect(prismaMock.series.create).toHaveBeenCalledTimes(1);
      expect(prismaMock.series.create).toHaveBeenCalledWith({
        data: { ...dbStatement.data, id: undefined },
        include: dbStatement.include,
      });
      expect(response).toBeTruthy();
      expect(response.status).toBe(StatusCodes.Created);
    });

    it("posts series without adventures", async () => {
      // Arrange
      const series = mockSeries[0];
      series.name = "Bla blub";
      const body = { series };
      const { req } = createMocks<ApiRequest, ApiResponse>({
        method: "POST",
        body,
      });

      req.json = jest.fn().mockResolvedValue(body.series);

      // Act
      const response = await POST(req);

      // Assert
      const dbStatement = buildSeriesDbStatement(series);
      expect(prismaMock.series.create).toHaveBeenCalledTimes(1);
      expect(prismaMock.series.create).toHaveBeenCalledWith({
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
      prismaMock.series.create.mockRejectedValue("Create failed");
      const series = mockFullSeries[0];
      const body = { series };
      const { req } = createMocks<ApiRequest, ApiResponse>({
        method: "POST",
        body,
      });

      req.json = jest.fn().mockResolvedValue(body.series);

      // Act
      const response = await POST(req);

      // Assert
      const dbStatement = buildSeriesDbStatement(series, series.adventures);
      expect(prismaMock.series.create).toHaveBeenCalledTimes(1);
      expect(prismaMock.series.create).toHaveBeenCalledWith({
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

  describe("Get Series", () => {
    it("gets all series", async () => {
      // Arrange
      prismaMock.series.findMany.mockResolvedValue(mockFullSeries);

      // Act
      const response = await GET();

      // Assert
      expect(prismaMock.series.findMany).toHaveBeenCalledTimes(1);
      expect(prismaMock.series.findMany).toHaveBeenCalledWith({
        include: seriesIncludes,
      });
      expect(response).toBeTruthy();
      expect(response.status).toBe(StatusCodes.OK);
    });

    it("handles error", async () => {
      // Arrange
      prismaMock.series.findMany.mockRejectedValue("Get failed");

      // Act
      const response = await GET();

      // Assert
      expect(prismaMock.series.findMany).toHaveBeenCalledTimes(1);
      expect(prismaMock.series.findMany).toHaveBeenCalledWith({
        include: seriesIncludes,
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
