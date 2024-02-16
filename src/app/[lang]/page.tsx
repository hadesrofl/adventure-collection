import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { Locale, getDictionary } from "@dictionaries/helpers/getDictionaries";
import { getUserLanguage } from "../../internationalizationMiddleware";
import { defaultLocale } from "@dictionaries/helpers/locales";
import Image from "next/image";
import { loadAdventures } from "@app/api/_actions/adventures/loadAdventures";
import { startSeeding } from "@app/api/_actions/seeding/startSeeding";
import { Adventure } from "@domain/models/adventure";

function createLevelRangeLabel(adventure: Adventure) {
  let levelRange = "";
  if (adventure.minLevel !== null && adventure.maxLevel !== null)
    levelRange = `${adventure.minLevel} - ${adventure.maxLevel}`;
  else if (adventure.minLevel !== null) levelRange = `${adventure.minLevel}+`;
  else if (adventure.maxLevel) levelRange = `<= ${adventure.minLevel}`;
  return levelRange;
}

export default async function Home() {
  await startSeeding();
  const userLanguage = (getUserLanguage() ?? defaultLocale) as Locale;
  const dictionary = await getDictionary(userLanguage);
  const adventures = await loadAdventures();
  return (
    <Grid container spacing={2} padding={2}>
      {adventures.map((adventure) => {
        const levelRange = createLevelRangeLabel(adventure);
        return (
          <Grid item xs={12} md={4} key={crypto.randomUUID()}>
            <Card sx={{ width: "100%" }}>
              {adventure.image ? (
                <CardMedia
                  component="div"
                  sx={{
                    display: "flex",
                    width: "100%",
                    height: "50vh",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  <Image src={adventure.image} alt="" fill />
                </CardMedia>
              ) : (
                <Box />
              )}

              <CardContent>
                <Stack direction="column" spacing={2}>
                  <Typography variant="h5" component="div" textAlign="center">
                    {adventure.name}
                  </Typography>
                  <Stack direction="row" spacing={1} justifyContent="center">
                    {adventure.tags.map((tag) => {
                      return (
                        <Chip label={tag.name} key={crypto.randomUUID()} />
                      );
                    })}
                  </Stack>
                  <Typography
                    variant="body1"
                    component="div"
                    textAlign="justify"
                    paragraph
                  >
                    {adventure.summary}
                  </Typography>
                  <Grid container>
                    <Grid item xs={6} md={3}>
                      <Typography variant="body2" component="span">
                        {dictionary.AdventureCards.pageCount}:
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <Typography variant="body2" component="span">
                        {adventure.pageCount}
                      </Typography>
                    </Grid>
                    {adventure.minLevel !== null ||
                    adventure.maxLevel !== null ? (
                      <>
                        <Grid item xs={6} md={3}>
                          <Typography variant="body2" component="span">
                            {dictionary.AdventureCards.levelRange}:
                          </Typography>
                        </Grid>
                        <Grid item xs={6} md={3}>
                          <Typography variant="body2" component="span">
                            {levelRange}
                          </Typography>
                        </Grid>
                      </>
                    ) : (
                      <Box />
                    )}
                  </Grid>
                  <Chip label={adventure.system.name} />
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}
