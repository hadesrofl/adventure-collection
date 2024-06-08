import { AdventureFull } from "../types/adventure";

export function removeRelationsFromAdventure(adventure: AdventureFull) {
  // we need to remove the id, system and series from the adventure entity for testing purposes
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return [adventure].map(({ id, system, series, ...rest }) => rest)[0];
}
