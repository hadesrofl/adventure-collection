import Grid from "@mui/material/Grid";
import { CommonProps } from "@mui/material/OverridableComponent";
import { AdventureFull } from "@domain/models/adventure";
import AdventureCard from "./cards/AdventureCard";
import AppRoutes from "@app/appRoutes";
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
            md={6}
            lg={3}
            key={crypto.randomUUID()}
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
