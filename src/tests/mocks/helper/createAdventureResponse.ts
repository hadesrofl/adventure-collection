import { AdventureFull } from "@domain/models/adventure";

export function createAdventureResponse(adventure: AdventureFull) {
  return {
    ...adventure, // add qoutes to mock data
    createdAt: "" + adventure.createdAt.toISOString() + "",
    updatedAt: "" + adventure.updatedAt.toISOString() + "",
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
}
