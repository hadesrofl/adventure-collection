import fs from "fs";
import { Repository } from "../../BaseRepository";

export async function createIfNotExists<T>(
  data: T,
  repository: Repository<T>,
  where: object
) {
  let inserted = false;
  const entities = await repository.list(where);
  if (entities.length === 0) {
    const created = await repository.create(data);
    console.log(created);
    inserted = true;
  }
  return inserted;
}

export function readJsonFile<T>(path: string) {
  let jsonData: T | undefined = undefined;
  try {
    const fileContent = fs.readFileSync(path, "utf-8");
    jsonData = JSON.parse(fileContent);
  } catch (e) {
    console.log(`Read file: ${path}`);
    console.log(e);
  } finally {
    return jsonData;
  }
}
