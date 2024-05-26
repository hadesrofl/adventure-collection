import { PrismaClient } from "@prisma/client";

interface IRepository<T> {
  create(entity: T): Promise<T>;
  list: (where?: object, skip?: number, limit?: number) => Promise<T[]>;
  getById: (id: number) => Promise<T>;
  delete(entity: T): Promise<T>;
  deleteById(id: number): Promise<T>;
}

export abstract class Repository<T> implements IRepository<T> {
  protected dbContext: PrismaClient;

  constructor(dbContext: PrismaClient) {
    this.dbContext = dbContext;
  }

  abstract create(entity: T): Promise<T>;
  abstract edit(entity: T): Promise<T>;
  abstract list: (
    where?: object,
    skip?: number,
    limit?: number
  ) => Promise<T[]>;
  abstract getById(id: number): Promise<T>;
  abstract delete(entity: T): Promise<T>;
  abstract deleteById(id: number): Promise<T>;
}
