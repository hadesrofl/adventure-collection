import { Adventure } from "@features/adventures";
import { AdventureRepository } from "@features/adventures";

export async function findLinkedAdventures(
  repository: AdventureRepository,
  where: object
): Promise<Adventure[]> {
  return (await repository.list(where)) as Adventure[];
}

export async function findAdventuresToDisconnect(
  repository: AdventureRepository,
  where: object,
  adventures: Adventure[]
) {
  const linkedAdventures = await findLinkedAdventures(repository, where);
  const adventuresToDisconnect = linkedAdventures.filter(
    (adventure) => adventures.find((a) => a.id === adventure.id) === undefined
  );
  return adventuresToDisconnect;
}
