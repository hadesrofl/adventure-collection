import { mockDeep, mockReset, DeepMockProxy } from "jest-mock-extended";
import prismaClient from "@repositories/prisma";
import { PrismaClient } from "@prisma/client";

jest.mock("@repositories/prisma", () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));

beforeEach(() => {
  mockReset(prismaMock);
});

export const prismaMock =
  prismaClient as unknown as DeepMockProxy<PrismaClient>;
