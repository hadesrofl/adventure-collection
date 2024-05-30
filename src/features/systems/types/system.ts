import { Prisma } from "@prisma/client";

export const systemIncludes = {
  adventures: true,
};

export type System = Prisma.SystemGetPayload<{}>;

export type SystemFull = Prisma.SystemGetPayload<{
  include: { adventures: true };
}>;
