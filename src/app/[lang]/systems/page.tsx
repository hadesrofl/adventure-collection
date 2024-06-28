import { getDictionary } from "@dictionaries/helpers/getDictionaries";
import { LangParam } from "@app/_shared/langParam";
import {
  NoSystemsDialog,
  SystemGallery,
  systemRepository,
} from "@features/systems";

export default async function SystemGalleryPage({ params }: LangParam) {
  const systems = await systemRepository.list();
  const dictionary = await getDictionary(params.lang);
  const doSystemsExist = systems.length > 0;
  return doSystemsExist ? (
    <SystemGallery className="m-4" systems={systems} dictionary={dictionary} />
  ) : (
    <NoSystemsDialog />
  );
}
