import { AdventureForm } from "@features/adventures";
import { tagRepository } from "@features/tags";
import { genreRepository } from "@features/genres";
import { NoSystemsDialog, systemRepository } from "@features/systems";

export default async function AdventureCreatePage() {
  const tags = await tagRepository.list();
  const genres = await genreRepository.list();
  const systems = await systemRepository.list();
  const doSystemsExist = systems.length > 0;
  return doSystemsExist ? (
    <AdventureForm
      tagOptions={tags}
      genreOptions={genres}
      systemOptions={systems}
    />
  ) : (
    <NoSystemsDialog />
  );
}
