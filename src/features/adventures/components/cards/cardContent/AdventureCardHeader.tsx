import { Typography, Divider, Chip, Stack, Box, Grid } from "@mui/material";
import { AdventureCardCommonProps } from "./AdventureCardCommonProps";
import { TestIds } from "@tests/testIds";

export default function AdventureCardHeader({
  adventure,
}: AdventureCardCommonProps) {
  return (
    <>
      <Box textAlign="center">
        <Stack
          direction="column"
          spacing={1}
          alignItems="center"
          marginBottom={1}
        >
          <Stack
            direction="row"
            alignSelf="end"
            spacing={1}
            marginBottom={1}
            data-testid={TestIds.adventureCard.header(adventure.id)}
          >
            {adventure.series && (
              <Chip label={adventure.series?.name} variant="outlined" />
            )}
            <Chip
              label={adventure.system.name}
              variant="outlined"
              color="default"
            />
          </Stack>

          <Typography variant="h5" component="div" sx={{ marginTop: 2 }}>
            {adventure.name}
          </Typography>
        </Stack>

        <Divider sx={{ marginBottom: "1rem" }} />
        <Grid
          container
          justifyContent="center"
          alignItems="stretch"
          spacing={1}
          marginBottom={1}
          data-testid={TestIds.adventureCard.tagList(adventure.id)}
        >
          {adventure.tags.map((tag) => {
            return (
              <Grid item xs={4} key={crypto.randomUUID()}>
                <Chip
                  label={tag.name}
                  color="info"
                  sx={{
                    height: "100%",
                  }}
                />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </>
  );
}
