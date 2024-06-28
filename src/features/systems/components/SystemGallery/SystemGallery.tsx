import { CommonProps } from "@mui/material/OverridableComponent";
import Grid from "@mui/material/Grid";
import { TestIds } from "@tests/testIds";
import { Stack, Typography } from "@mui/material";
import { Dictionary } from "@dictionaries/helpers/getDictionaries";
import SystemButtonGroup from "../SystemButtonGroup/SystemButtonGroup";
import AddSystemDialogButton from "../AddSystemDialogButton/AddSystemDialogButton";
import { SystemFull } from "../../types/system";

interface SystemGalleryProps extends CommonProps {
  systems: SystemFull[];
  dictionary: Dictionary;
}

export default async function SystemGallery({
  systems,
  dictionary,
  ...props
}: SystemGalleryProps) {
  return (
    <Stack {...props} spacing={2}>
      <Typography variant="h4">{dictionary.SystemGallery.title}</Typography>
      <Grid container marginBottom={2}>
        <Grid item xs={5}>
          <Typography variant="h5">
            {dictionary.SystemGallery.headers.system}
          </Typography>
        </Grid>
        <Grid item xs={4} textAlign="center">
          <Typography variant="h5">
            {dictionary.SystemGallery.headers.adventureCount}
          </Typography>
        </Grid>
        <Grid item xs={3} textAlign="end">
          <Typography variant="h5">
            {dictionary.SystemGallery.headers.actions}
          </Typography>
        </Grid>
      </Grid>
      <Grid container rowGap={2} display="flex">
        {systems.map((entry) => {
          return (
            <Grid
              container
              display="flex"
              alignItems="center"
              key={crypto.randomUUID()}
              data-testid={TestIds.systemGallery.entry(entry.name)}
            >
              <Grid item xs={5}>
                <Typography>{entry.name}</Typography>
              </Grid>
              <Grid item xs={4} textAlign="center">
                <Typography
                  data-testid={TestIds.systemGallery.adventureCount(entry.name)}
                >
                  {entry.adventures.length}
                </Typography>
              </Grid>
              <Grid item xs={3} display="flex" justifyContent="end">
                <SystemButtonGroup system={entry} />
              </Grid>
            </Grid>
          );
        })}
      </Grid>
      <AddSystemDialogButton data-testid={TestIds.systemGallery.addButton} />
    </Stack>
  );
}
