"use server";
import { adventureRepository } from "../adventureRepository";

export async function loadAdventures(
  where?: object,
  skip?: number,
  limit?: number
) {
  return adventureRepository.list(where, skip, limit);
}

export async function loadAdventure(id: number) {
  return adventureRepository.getById(id);
}
