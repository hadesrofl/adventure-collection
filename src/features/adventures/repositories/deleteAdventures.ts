"use server";

import { adventureRepository } from "../adventureRepository";

export async function deleteAdventureById(id: number) {
  return adventureRepository.deleteById(id);
}
