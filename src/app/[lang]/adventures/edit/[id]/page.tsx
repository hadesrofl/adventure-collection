import IdParamProps from "@app/_shared/idParam";
import dbContext from "@repositories/dbContext";
import { AdventureForm } from "@features/adventures";

export default async function AdventureEditPage({ params }: IdParamProps) {
  const adventure = await dbContext.adventures.getById(
    Number.parseInt(params.id)
  );
  const tags = await dbContext.tags.list();
  const genres = await dbContext.genres.list();
  const systems = await dbContext.systems.list();

  return (
    <AdventureForm
      tagOptions={tags}
      genreOptions={genres}
      adventure={adventure}
      systemOptions={systems}
    />
  );
}
