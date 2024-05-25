import { loadAdventures } from "@app/api/_actions/adventures/loadAdventures";
import { startSeeding } from "@app/api/_actions/seeding/startSeeding";
import AdventureCardGallery from "@components/adventures/AdventureCardGallery";
import NoAdventureDialog from "@components/adventures/dialogs/NoAdenture/NoAdventureDialog";
import { Box } from "@mui/material";

export default async function AdventureCollectionPage() {
  await startSeeding();
  const adventures = await loadAdventures();
  return adventures.length > 0 ? (
    <Box sx={{ marginLeft: 2, marginRight: 2 }}>
      <AdventureCardGallery adventures={adventures} />
    </Box>
  ) : (
    <NoAdventureDialog />
  );
}
