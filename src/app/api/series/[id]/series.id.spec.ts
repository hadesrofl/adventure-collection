/**
 * @jest-environment node
 */
import { createMocks } from "node-mocks-http";
import { DELETE, PUT } from "./route";
import StatusCodes from "../../_internal/shared/StatusCodes";
import { prismaMock } from "@tests/setup/prisma";
import { ApiRequest, ApiResponse } from "@tests/mocks/fetch";
import { mockFullSeries, mockSeries } from "@tests/mockData/mockSeries";
import { seriesIncludes } from "@features/series";
import { buildSeriesDbStatement } from "@tests/helpers/buildSeriesDbStatement";
import { mockAdventures } from "@tests/mockData/mockAdventures";

jest.mock("next/cache");

describe("/series/[id] routes", () => {
  describe("Update Series", () => {
    it("updates series", async () => {
      // Arrange
      const series = mockFullSeries[0];
      prismaMock.adventure.findMany.mockResolvedValue(series.adventures);
      series.name = "Bla blub";
      const body = { series };
      const { req } = createMocks<ApiRequest, ApiResponse>({
        method: "PUT",
        body,
      });

      req.json = jest.fn().mockResolvedValue(body.series);

      // Act
      const response = await PUT(req);

      // Assert
      expect(prismaMock.series.update).toHaveBeenCalledTimes(1);
      expect(prismaMock.series.update).toHaveBeenCalledWith({
        where: { id: series.id },
        ...buildSeriesDbStatement(series, series.adventures, []),
      });
      expect(response).toBeTruthy();
      expect(response.status).toBe(StatusCodes.NoContent);
    });

    it("updates series but it stays the same", async () => {
      // Arrange
      const series = mockFullSeries[0];
      prismaMock.adventure.findMany.mockResolvedValue(series.adventures);
      const body = { series };
      const { req } = createMocks<ApiRequest, ApiResponse>({
        method: "PUT",
        body,
      });

      req.json = jest.fn().mockResolvedValue(body.series);

      // Act
      const response = await PUT(req);

      // Assert
      expect(prismaMock.series.update).toHaveBeenCalledTimes(1);
      expect(prismaMock.series.update).toHaveBeenCalledWith({
        where: { id: series.id },
        ...buildSeriesDbStatement(series, series.adventures, []),
      });
      expect(response).toBeTruthy();
      expect(response.status).toBe(StatusCodes.NoContent);
    });

    it("handles error", async () => {
      // Arrange
      prismaMock.series.update.mockRejectedValue("Update failed");
      const series = mockFullSeries[0];
      prismaMock.adventure.findMany.mockResolvedValue(series.adventures);
      const body = { series };
      const { req } = createMocks<ApiRequest, ApiResponse>({
        method: "PUT",
        body,
      });

      req.json = jest.fn().mockResolvedValue(body.series);

      // Act
      const response = await PUT(req);

      // Assert
      expect(prismaMock.series.update).toHaveBeenCalledTimes(1);
      expect(prismaMock.series.update).toHaveBeenCalledWith({
        where: { id: series.id },
        ...buildSeriesDbStatement(series, series.adventures, []),
      });
      expect(response).toBeTruthy();
      expect(await response.json()).toEqual({
        message: "Update failed",
        statusCode: StatusCodes.InternalServerError,
      });
      expect(response.status).toBe(StatusCodes.InternalServerError);
    });
  });

  describe("Deletes Series", () => {
    it("deletes series", async () => {
      // Arrange
      const series = mockFullSeries[0];
      const params = { params: { id: `${series.id}` } };
      prismaMock.adventure.findMany.mockResolvedValue(
        mockAdventures.filter(
          (adventure) => adventure.series?.name === series.name
        )
      );
      const { req } = createMocks<ApiRequest, ApiResponse>({
        method: "DELETE",
      });

      // Act
      const response = await DELETE(req, params);

      // Assert
      expect(prismaMock.series.delete).toHaveBeenCalledTimes(1);
      expect(prismaMock.series.delete).toHaveBeenCalledWith({
        include: seriesIncludes,
        where: { id: series.id },
      });
      expect(response).toBeTruthy();
      expect(response.status).toBe(StatusCodes.NoContent);
    });

    it("handles error", async () => {
      // Arrange
      prismaMock.series.delete.mockRejectedValue("Delete failed");
      const series = mockSeries[0];
      prismaMock.adventure.findMany.mockResolvedValue(
        mockAdventures.filter(
          (adventure) => adventure.series?.name === series.name
        )
      );
      const params = { params: { id: `${series.id}` } };
      const { req } = createMocks<ApiRequest, ApiResponse>({
        method: "DELETE",
      });

      // Act
      const response = await DELETE(req, params);

      // Assert
      expect(prismaMock.series.delete).toHaveBeenCalledTimes(1);
      expect(prismaMock.series.delete).toHaveBeenCalledWith({
        include: seriesIncludes,
        where: { id: series.id },
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
