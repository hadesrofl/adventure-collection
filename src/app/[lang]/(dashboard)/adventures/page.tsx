import { LangParam } from "@app/_shared/langParam";
import AppPageContainer from "@components/AppPageContainer";
import { getDictionary } from "@dictionaries/helpers/getDictionaries";
import {
  AdventureCardGallery,
  NoAdventureDialog,
  loadAdventures,
} from "@features/adventures";
import { systemRepository, NoSystemsDialog } from "@features/systems";
import { startSeeding } from "@repositories/seeding/startSeeding";

export default async function AdventureCollectionPage({ params }: LangParam) {
  const dictionary = await getDictionary(params.lang);
  await startSeeding();
  const systems = await systemRepository.list();
  const doSystemsExist = systems.length > 0;

  if (!doSystemsExist) return <NoSystemsDialog />;
  const adventures = await loadAdventures();
  return adventures.length > 0 ? (
    <AppPageContainer
      title={dictionary.PageTitles.AdventureGallery}
      pathname=""
    >
      <AdventureCardGallery adventures={adventures} />
    </AppPageContainer>
  ) : (
    <AppPageContainer
      title={dictionary.PageTitles.AdventureGallery}
      pathname=""
    >
      <NoAdventureDialog />
    </AppPageContainer>
  );
}
