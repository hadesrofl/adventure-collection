import { GenreSeedData } from "@app/api/_internal/shared/db/seeding/data/seedGenres";
import { Genre } from "@domain/models/genre";

export const mockGenreSeeds: GenreSeedData[] = [
  {
    name: "Science Fiction",
    children: [
      {
        name: "Cyberpunk",
        children: [],
      },
    ],
  },
  {
    name: "Fantasy",
    children: [
      {
        name: "Sword & Sorcery",
        children: [],
      },
      {
        name: "Weird Fantasy",
        children: [],
      },
      {
        name: "Dark Fantasy",
        children: [
          {
            name: "Grim Dark",
            children: [],
          },
          {
            name: "Dark Fairytale",
            children: [],
          },
        ],
      },
    ],
  },
];

export const mockGenres: Genre[] = [
  {
    id: 1,
    name: "Fantasy",
    createdAt: new Date(),
    parentId: null,
  },
  {
    id: 2,
    name: "Sword & Sorcery",
    createdAt: new Date(),
    parentId: 1,
  },
  {
    id: 3,
    name: "Weird Fantasy",
    createdAt: new Date(),
    parentId: 1,
  },
  {
    id: 4,
    name: "Dark Fantasy",
    createdAt: new Date(),
    parentId: 1,
  },
  {
    id: 5,
    name: "Dark Fairytale",
    createdAt: new Date(),
    parentId: 4,
  },
  {
    id: 6,
    name: "Grim Dark",
    createdAt: new Date(),
    parentId: 4,
  },
  {
    id: 7,
    name: "Science Fiction",
    createdAt: new Date(),
    parentId: null,
  },
  {
    id: 8,
    name: "Cyberpunk",
    createdAt: new Date(),
    parentId: 7,
  },
];
