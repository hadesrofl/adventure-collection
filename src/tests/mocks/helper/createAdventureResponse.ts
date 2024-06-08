import { Adventure } from "@domain/models/adventure";
import { AdventureFull, isAdventureFull } from "@features/adventures";

export function createAdventureResponse(adventure: Adventure | AdventureFull) {
  if (isAdventureFull(adventure)) {
    return {
      ...createResponse(adventure),
      tags: adventure.tags.map((tag) => {
        return {
          ...tag,
          createdAt: "" + tag.createdAt.toISOString() + "",
        };
      }),
      genres: adventure.genres.map((genre) => {
        return {
          ...genre,
          createdAt: "" + genre.createdAt.toISOString() + "",
        };
      }),
      system: {
        ...adventure.system,
        createdAt: "" + adventure.system.createdAt.toISOString() + "",
      },
    };
  } else {
    return createResponse(adventure);
  }
}

function createResponse(adventure: Adventure | AdventureFull) {
  return {
    ...adventure, // add qoutes to mock data
    createdAt: "" + adventure.createdAt.toISOString() + "",
    updatedAt: "" + adventure.updatedAt.toISOString() + "",
  };
}
