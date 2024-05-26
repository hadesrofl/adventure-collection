import { PrismaClient, Tag } from "@prisma/client";
import { cache } from "react";
import { Repository } from "@repositories/BaseRepository";

export class TagRepository extends Repository<Tag> {
  constructor(client: PrismaClient) {
    super(client);
  }

  public async create(tag: Tag): Promise<Tag> {
    throw new Error("Method not implemented.");
  }

  public async edit(tag: Tag): Promise<Tag> {
    const updated = await this.dbContext.tag.update({
      where: { id: tag.id },
      data: tag,
    });
    return updated;
  }

  list = cache(async (where?: object, skip?: number, limit?: number) => {
    return await this.dbContext.tag.findMany({ where, skip, take: limit });
  });

  getById = cache(async (id: number): Promise<Tag> => {
    throw new Error("Method not implemented.");
  });

  public async delete(entity: Tag) {
    return await this.deleteById(entity.id);
  }

  public async deleteById(id: number) {
    const deleted = await this.dbContext.tag.delete({ where: { id } });
    return deleted;
  }
}
