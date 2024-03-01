"use server";

import dbContext from "@app/api/_internal/shared/db/dbContext";

export async function deleteAdventureById(id: number) {
  return dbContext.adventures.deleteById(id);
}
