"use server";

import dbContext from "@repositories/dbContext";

export async function deleteAdventureById(id: number) {
  return dbContext.adventures.deleteById(id);
}
