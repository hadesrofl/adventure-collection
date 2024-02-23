"use server";
import dbContext from "@app/api/_internal/shared/db/dbContext";

export async function loadAdventures(
  where?: object,
  skip?: number,
  limit?: number
) {
  return dbContext.adventures.list(where, skip, limit);
}
