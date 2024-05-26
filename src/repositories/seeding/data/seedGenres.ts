import { Genre, GenreFull } from "@features/genres";
import { Repository } from "../../BaseRepository";
import { createIfNotExists, readJsonFile } from "../helper/seedHelper";

export interface GenreSeedData {
  name: string;
  children: GenreSeedData[];
}

function createGenre(
  name: string,
  children: GenreSeedData[],
  destination: GenreFull[]
): GenreFull {
  const importedChildren = children.map((child) =>
    createGenre(child.name, child.children, destination)
  );
  const genre = {
    id: 0,
    name,
    adventures: [],
    parentId: null,
    parent: null,
    children: importedChildren,
    createdAt: new Date(Date.now()),
  };
  destination.push(genre);
  return genre;
}

function getGenreData(): GenreFull[] {
  const genreData = readJsonFile<GenreSeedData[]>(
    `${process.env.SEED_DATA_DIR}/genres.json`
  );

  if (genreData === undefined) return [];

  const genres: GenreFull[] = [];
  genreData.forEach((genre) => createGenre(genre.name, genre.children, genres));

  return genres;
}

async function findChildren(
  genre: GenreFull,
  seedRepository: Repository<GenreFull>
) {
  let children: Genre[] = [];
  if (genre.children) {
    for (let j = 0; j < genre.children.length; j += 1) {
      const childrenInDb = await seedRepository.list({
        name: genre.children[j].name,
      });
      childrenInDb.forEach((child) => children.push(child));
    }
  }

  return children;
}

export async function seedGenres(seedRepository: Repository<GenreFull>) {
  console.log("Seeding Genres...");
  const seedData = getGenreData();
  let dataCount = 0;
  for (let i = 0; i < seedData.length; i += 1) {
    const genre = seedData[i];
    const children = await findChildren(genre, seedRepository);
    const where = {
      name: genre.name,
    };
    if (await createIfNotExists({ ...genre, children }, seedRepository, where))
      dataCount++;
  }
  console.log(`Genres inserted: ${dataCount}`);
}
