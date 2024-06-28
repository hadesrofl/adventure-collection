import { startSeeding } from "@repositories/seeding/startSeeding";
import {
  AdventureCardGallery,
  NoAdventureDialog,
  loadAdventures,
} from "@features/adventures";
import { Box } from "@mui/material";
import { NoSystemsDialog, systemRepository } from "@features/systems";

export default async function AdventureCollectionPage() {
  await startSeeding();
  const adventures = await loadAdventures();
  const systems = await systemRepository.list();
  const doSystemsExist = systems.length > 0;

  if (!doSystemsExist) return <NoSystemsDialog />;
  return adventures.length > 0 ? (
    <Box sx={{ marginLeft: 2, marginRight: 2 }}>
      <AdventureCardGallery adventures={adventures} />
    </Box>
  ) : (
    <NoAdventureDialog />
  );
}
