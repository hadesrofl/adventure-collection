import dbContext from "@app/api/_internal/shared/db/dbContext";
import AdventureForm from "@components/adventures/forms/AdventureForm";

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
