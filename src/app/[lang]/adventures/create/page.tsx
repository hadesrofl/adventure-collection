import dbContext from "@repositories/dbContext";
import { AdventureForm } from "@features/adventures";

export default async function AdventureCreatePage() {
  const tags = await dbContext.tags.list();
  const genres = await dbContext.genres.list();
  const systems = await dbContext.systems.list();
  return (
    <AdventureForm
      tagOptions={tags}
      genreOptions={genres}
      systemOptions={systems}
    />
  );
}
