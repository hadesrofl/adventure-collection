import { loadAdventures } from "@app/api/_actions/adventures/loadAdventures";
import { startSeeding } from "@app/api/_actions/seeding/startSeeding";
import AdventureCardGallery from "@components/adventures/AdventureCardGallery";
import NoAdventureDialog from "@components/adventures/dialogs/NoAdenture/NoAdventureDialog";

export default async function AdventureCollectionPage() {
  await startSeeding();
  const adventures = await loadAdventures();
  return adventures.length > 0 ? (
    <AdventureCardGallery adventures={adventures} />
  ) : (
    <NoAdventureDialog />
  );
}
