import { startSeeding } from "@repositories/seeding/startSeeding";
import {
  AdventureCardGallery,
  NoAdventureDialog,
  loadAdventures,
} from "@features/adventures";
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
