import Grid from "@mui/material/Grid";
import { CommonProps } from "@mui/material/OverridableComponent";
import { AdventureFull } from "../types/adventure";
import AdventureCard from "./cards/AdventureCard";
import AppRoutes from "@routes/appRoutes";
import { TestIds } from "@tests/testIds";

export interface AdventureCardGalleryProps extends CommonProps {
  adventures: AdventureFull[];
}

export default async function AdventureCardGallery({
  adventures,
}: AdventureCardGalleryProps) {
  return (
    <Grid container spacing={4} data-testid={TestIds.adventureCardGallery}>
      {adventures.map((adventure) => {
        return (
          <Grid
            className="flex item-stretch"
            item
            xs={12}
            md={4}
            lg={3}
            key={crypto.randomUUID()}
            justifyContent="center"
          >
            <AdventureCard
              adventure={adventure}
              href={AppRoutes.adventureRoutes.show(adventure.id)}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}
