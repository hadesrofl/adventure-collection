import { AdventureFull } from "@domain/models/adventure";

export default function getTagsToDelete(
  oldAdventureEntry: AdventureFull,
  newAdventureEntry: AdventureFull
) {
  return oldAdventureEntry?.tags.filter((oldTag) => {
    let keep = false;
    newAdventureEntry.tags.forEach((newTag) => {
      if (newTag.name === oldTag.name) {
        keep = true;
      }
    });
    return keep ? undefined : { id: oldTag.id };
  });
}
