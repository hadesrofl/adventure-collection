import { cache } from "react";
import { PrismaClient } from "@prisma/client";
import { Repository } from "@app/api/_internal/shared/db/BaseRepository";
import { SeriesFull, seriesIncludes } from "@domain/models/series";
import { findAdventuresToDisconnect } from "../../shared/db/helper/findLinkedAdventures";
import dbContext from "../../shared/db/dbContext";

class SeriesRepository extends Repository<SeriesFull> {
  constructor(client: PrismaClient) {
    super(client);
  }

  public async create(series: SeriesFull) {
    const created = await this.dbContext.series.create({
      data: {
        ...series,
        id: undefined,
        adventures: {
          connect: series.adventures.map((adventure) => {
            return {
              id: adventure.id,
            };
          }),
        },
      },
      include: seriesIncludes,
    });
    return created;
  }

  public async edit(series: SeriesFull) {
    const adventuresToDisconnect = await findAdventuresToDisconnect(
      dbContext.adventures,
      {
        where: { seriesId: series.id },
      },
      series.adventures
    );

    const updated = await this.dbContext.series.update({
      where: {
        id: series.id,
      },
      data: {
        ...series,
        adventures: {
          connect: series.adventures.map((adventure) => {
            return {
              id: adventure.id,
            };
          }),
          disconnect: adventuresToDisconnect,
        },
      },
      include: seriesIncludes,
    });

    return updated;
  }

  list = cache(async (where?: object, skip?: number, limit?: number) => {
    return await this.dbContext.series.findMany({
      where,
      skip: skip,
      take: limit,
      include: seriesIncludes,
    });
  });

  getById = cache(async (id: number) => {
    return await this.dbContext.series.findFirstOrThrow({
      where: { id },
      include: seriesIncludes,
    });
  });

  public async delete(entity: SeriesFull) {
    return await this.deleteById(entity.id);
  }

  public async deleteById(id: number) {
    const deleted = await this.dbContext.series.delete({
      where: { id },
      include: seriesIncludes,
    });
    return deleted;
  }
}

export default SeriesRepository;
