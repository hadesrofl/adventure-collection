import { mockDeep, mockReset, DeepMockProxy } from "jest-mock-extended";
import prismaClient from "@app/api/_internal/shared/db/prisma";
import { PrismaClient } from "@prisma/client";

jest.mock("@app/api/_internal/shared/db/prisma", () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));

beforeEach(() => {
  mockReset(prismaMock);
});

export const prismaMock =
  prismaClient as unknown as DeepMockProxy<PrismaClient>;
