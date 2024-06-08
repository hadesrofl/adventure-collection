import IdParamProps from "@app/_shared/idParam";
import { AdventureForm } from "@features/adventures";
import { tagRepository } from "@features/tags";
import { genreRepository } from "@features/genres";
import { systemRepository } from "@features/systems";
import { adventureRepository } from "@features/adventures/adventureRepository";

export default async function AdventureEditPage({ params }: IdParamProps) {
  const adventure = await adventureRepository.getById(
    Number.parseInt(params.id)
  );
  const tags = await tagRepository.list();
  const genres = await genreRepository.list();
  const systems = await systemRepository.list();

  return (
    <AdventureForm
      tagOptions={tags}
      genreOptions={genres}
      adventure={adventure}
      systemOptions={systems}
    />
  );
}
