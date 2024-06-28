import { SystemFull, systemIncludes } from "../types/system";
import { PrismaClient } from "@prisma/client";
import { cache } from "react";
import { Repository } from "@repositories/BaseRepository";
import { findAdventuresToDisconnect } from "@utils/findLinkedAdventures";
import prismaClient from "@repositories/prisma";
import {
  AdventureRepository,
  adventureRepository,
} from "@features/adventures/repositoryExports";

export class SystemRepository extends Repository<SystemFull> {
  private readonly adventureRepository: AdventureRepository;
  constructor(client: PrismaClient, adventureRepository: AdventureRepository) {
    super(client);
    this.adventureRepository = adventureRepository;
  }

  public async create(system: SystemFull) {
    const created = await this.dbContext.system.create({
      data: {
        ...system,
        id: undefined,
        adventures: {
          connect: system.adventures,
        },
      },
      include: systemIncludes,
    });
    return created;
  }

  public async edit(system: SystemFull) {
    const oldSystem = await this.getById(system.id);
    const newAdventures = system.adventures.filter((adventure) => {
      if (oldSystem.adventures.find((adv) => adv.id === adventure.id))
        return false;
      return true;
    });
    const adventuresToDisconnect = await findAdventuresToDisconnect(
      this.adventureRepository,
      { systemId: system.id },
      system.adventures
    );

    const updated = await this.dbContext.system.update({
      where: {
        id: system.id,
      },
      data: {
        ...system,
        adventures: {
          connect: newAdventures.length ? newAdventures : undefined,
          disconnect: adventuresToDisconnect.length
            ? adventuresToDisconnect
            : undefined,
        },
      },
      include: systemIncludes,
    });

    return updated;
  }

  list = cache(async (where?: object, skip?: number, limit?: number) => {
    return await this.dbContext.system.findMany({
      where,
      skip: skip,
      take: limit,
      include: systemIncludes,
    });
  });

  getById = cache(async (id: number) => {
    return await this.dbContext.system.findFirstOrThrow({
      where: { id },
      include: systemIncludes,
    });
  });

  public async delete(entity: SystemFull) {
    return await this.deleteById(entity.id);
  }

  public async deleteById(id: number) {
    const deleted = await this.dbContext.system.delete({
      where: { id },
      include: systemIncludes,
    });
    return deleted;
  }
}

export const systemRepository = new SystemRepository(
  prismaClient,
  adventureRepository
);
