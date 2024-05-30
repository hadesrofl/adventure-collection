import { cache } from "react";
import { PrismaClient } from "@prisma/client";
import getTagsToDelete from "../utils/getTagsToDelete";
import { Repository } from "@repositories/BaseRepository";
import { AdventureFull, adventureIncludes } from "../types/adventure";

class AdventureRepository extends Repository<AdventureFull> {
  constructor(client: PrismaClient) {
    super(client);
  }

  public async create(adventure: AdventureFull) {
    const data = {
      ...adventure,
      id: undefined,
      systemId: adventure.systemId,
      tags: {
        connectOrCreate: adventure.tags.map((tag) => {
          return { where: { name: tag.name }, create: { name: tag.name } };
        }),
      },
      genres: {
        connect: adventure.genres.map((genre) => {
          return { id: genre.id };
        }),
      },
      seriesId: adventure.seriesId ?? undefined,
      series: undefined,
      system: undefined,
    };
    const created = await this.dbContext.adventure.create({
      data,
      include: adventureIncludes,
    });
    return created;
  }

  public async edit(adventure: AdventureFull) {
    const {
      adventureWithoutRelations,
      tagsToDelete,
      genresToDelete,
      systemUpdate,
      seriesUpdate,
    } = await this.getUpdateData(adventure);

    const updated = await this.dbContext.adventure.update({
      where: {
        id: adventure.id,
      },
      data: {
        ...adventureWithoutRelations,
        tags: {
          connectOrCreate: adventure.tags.map((tag) => {
            return { where: { id: tag.id }, create: { name: tag.name } };
          }),
          disconnect: tagsToDelete,
        },
        genres: {
          connectOrCreate: adventure.genres.map((genre) => {
            return { where: { id: genre.id }, create: { name: genre.name } };
          }),
          disconnect: genresToDelete,
        },
      },
      include: adventureIncludes,
    });

    return updated;
  }

  list = cache(async (where?: object, skip?: number, limit?: number) => {
    return await this.dbContext.adventure.findMany({
      where,
      skip: skip,
      take: limit,
      include: adventureIncludes,
    });
  });

  getById = cache(async (id: number) => {
    return await this.dbContext.adventure.findFirstOrThrow({
      where: { id },
      include: adventureIncludes,
    });
  });

  public async delete(entity: AdventureFull) {
    return await this.deleteById(entity.id);
  }

  public async deleteById(id: number) {
    const deleted = await this.dbContext.adventure.delete({
      where: { id },
      include: adventureIncludes,
    });
    return deleted;
  }

  private async getUpdateData(adventure: AdventureFull) {
    const oldAdventureEntry = await this.dbContext.adventure.findFirst({
      where: { id: adventure.id },
      include: adventureIncludes,
    });

    const tagsToDelete =
      oldAdventureEntry !== null && oldAdventureEntry !== undefined
        ? getTagsToDelete(oldAdventureEntry, adventure)
        : [];

    const genresToDelete =
      oldAdventureEntry?.genres.filter(
        (genre) => !adventure.genres.find((g) => g.name === genre.name)
      ) ?? [];

    const seriesUpdate = {
      connect:
        adventure.seriesId !== null ? { id: adventure.seriesId } : undefined,
      disconnect:
        oldAdventureEntry !== null &&
        oldAdventureEntry !== undefined &&
        oldAdventureEntry.seriesId !== null
          ? { id: oldAdventureEntry?.seriesId }
          : undefined,
    };

    const systemUpdate =
      adventure.systemId === oldAdventureEntry?.systemId
        ? undefined
        : { connect: { id: adventure.systemId } };

    const adventureWithoutRelations = [adventure].map(
      ({ id, system, series, ...rest }) => rest
    )[0];
    return {
      adventureWithoutRelations,
      tagsToDelete,
      genresToDelete,
      systemUpdate,
      seriesUpdate,
    };
  }
}

export default AdventureRepository;
