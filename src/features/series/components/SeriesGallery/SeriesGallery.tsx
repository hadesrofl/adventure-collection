import { CommonProps } from "@mui/material/OverridableComponent";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import Badge from "@mui/material/Badge";
import { TestIds } from "@tests/testIds";
import SeriesButtonGroup from "../SeriesButtonGroup/SeriesButtonGroup";
import { Stack, Typography } from "@mui/material";
import AddSeriesDialogButton from "../AddSeriesDialogButton/AddSeriesDialogButton";
import { Dictionary } from "@dictionaries/helpers/getDictionaries";
import { SeriesFull } from "../../types/series";
import { systemRepository } from "@features/systems";

interface SeriesGalleryProps extends CommonProps {
  series: SeriesFull[];
  dictionary: Dictionary;
}

export default async function SeriesGallery({
  series,
  dictionary,
  ...props
}: SeriesGalleryProps) {
  const iconColumnClasses = "flex justify-end";
  const systems = await systemRepository.list();

  return (
    <Stack {...props} spacing={2}>
      <Grid container marginBottom={2}>
        <Grid item xs={4}>
          <Typography variant="h5">
            {dictionary.SeriesGallery.headers.system}
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography variant="h5">
            {dictionary.SeriesGallery.headers.series}
          </Typography>
        </Grid>
        <Grid item xs={3} textAlign="end">
          <Typography variant="h5">
            {dictionary.SeriesGallery.headers.actions}
          </Typography>
        </Grid>
      </Grid>
      <Grid container rowGap={2}>
        {series.map((entry) => {
          const count = entry.adventures.length;
          return (
            <Grid
              container
              className="items-center"
              key={crypto.randomUUID()}
              data-testid={TestIds.seriesGallery.entry(entry.name)}
            >
              <Grid item xs={4}>
                <Typography>{entry.system.name}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Badge
                  data-testid={TestIds.seriesGallery.badge(entry.name)}
                  badgeContent={count}
                  color="primary"
                  showZero
                >
                  <Chip label={entry.name} />
                </Badge>
              </Grid>
              <Grid item xs={4} className={iconColumnClasses}>
                <SeriesButtonGroup series={entry} />
              </Grid>
            </Grid>
          );
        })}
      </Grid>
      <AddSeriesDialogButton
        data-testid={TestIds.seriesGallery.addButton}
        systems={systems}
      />
    </Stack>
  );
}
