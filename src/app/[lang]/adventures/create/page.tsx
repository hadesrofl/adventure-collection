import { AdventureForm } from "@features/adventures";
import { tagRepository } from "@features/tags";
import { genreRepository } from "@features/genres";
import { systemRepository } from "@features/systems";

export default async function AdventureCreatePage() {
  const tags = await tagRepository.list();
  const genres = await genreRepository.list();
  const systems = await systemRepository.list();
  return (
    <AdventureForm
      tagOptions={tags}
      genreOptions={genres}
      systemOptions={systems}
    />
  );
}
