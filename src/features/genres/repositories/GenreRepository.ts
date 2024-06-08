import { cache } from "react";
import { PrismaClient } from "@prisma/client";
import { Repository } from "@repositories/BaseRepository";
import { GenreFull, genreIncludes } from "@features/genres";
import { AdventureRepository } from "@features/adventures";
import { findAdventuresToDisconnect } from "@utils/findLinkedAdventures";
import prismaClient from "@repositories/prisma";
import { adventureRepository } from "@features/adventures/adventureRepository";

class GenreRepository extends Repository<GenreFull> {
  private readonly adventureRepository: AdventureRepository;
  constructor(client: PrismaClient, adventureRepository: AdventureRepository) {
    super(client);
    this.adventureRepository = adventureRepository;
  }

  public async create(genre: GenreFull) {
    const created = await this.dbContext.genre.create({
      data: {
        ...genre,
        id: undefined,
        adventures: {
          connect: genre.adventures.map((adventure) => {
            return {
              id: adventure.id,
            };
          }),
        },
        children: {
          connect: genre.children.map((child) => {
            return {
              id: child.id,
            };
          }),
        },
        parentId: genre.parentId,
        parent: undefined,
      },
      include: genreIncludes,
    });
    return created;
  }

  public async edit(genre: GenreFull) {
    const oldEntry = await this.dbContext.genre.findFirst({
      where: { id: genre.id },
      include: { children: true },
    });

    const childrenToDisconnect = oldEntry?.children.filter(
      (child) => !genre.children.includes(child)
    );

    const adventuresToDisconnect = await findAdventuresToDisconnect(
      this.adventureRepository,
      { genre: { some: { id: genre.id } } },
      genre.adventures
    );

    const updated = await this.dbContext.genre.update({
      where: {
        id: genre.id,
      },
      data: {
        ...genre,
        adventures: {
          connect: genre.adventures.map((adventure) => {
            return {
              id: adventure.id,
            };
          }),
          disconnect: adventuresToDisconnect,
        },
        children: {
          connect: genre.children.map((child) => {
            return {
              id: child.id,
            };
          }),
          disconnect: childrenToDisconnect,
        },
        parentId: genre.parentId,
        parent: undefined,
      },
      include: genreIncludes,
    });

    return updated;
  }

  list = cache(async (where?: object, skip?: number, limit?: number) => {
    return await this.dbContext.genre.findMany({
      where,
      skip: skip,
      take: limit,
      include: genreIncludes,
    });
  });

  getById = cache(async (id: number) => {
    return await this.dbContext.genre.findFirstOrThrow({
      where: { id },
      include: genreIncludes,
    });
  });

  public async delete(entity: GenreFull) {
    return await this.deleteById(entity.id);
  }

  public async deleteById(id: number) {
    const deleted = await this.dbContext.genre.delete({
      where: { id },
      include: genreIncludes,
    });
    return deleted;
  }
}

export const genreRepository = new GenreRepository(
  prismaClient,
  adventureRepository
);
export default GenreRepository;
