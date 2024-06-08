"use server";

import { adventureRepository } from "../repositoryExports";

export async function deleteAdventureById(id: number) {
  return adventureRepository.deleteById(id);
}
