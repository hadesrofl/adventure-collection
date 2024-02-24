import { Grid, Typography, Box, Stack } from "@mui/material";
import AdventureCardHeader from "./AdventureCardHeader";
import { Adventure } from "@prisma/client";
import { useContext } from "react";
import { DictionaryContext } from "@dictionaries/helpers/dictionaryContext";
import { AdventureCardCommonProps } from "./AdventureCardCommonProps";
import { getSummaryParagraphs } from "@domain/models/adventure";

export function createLevelRangeLabel(adventure: Adventure) {
  let levelRange = "";
  if (adventure.minLevel !== null && adventure.maxLevel !== null)
    levelRange = `${adventure.minLevel} - ${adventure.maxLevel}`;
  else if (adventure.minLevel !== null) levelRange = `${adventure.minLevel}+`;
  else if (adventure.maxLevel) levelRange = `<= ${adventure.minLevel}`;
  return levelRange;
}

export interface AdventureCardContentProps extends AdventureCardCommonProps {
  showSummary?: boolean;
  href?: string;
}

function AdventureCardSummary({ adventure }: AdventureCardCommonProps) {
  return getSummaryParagraphs(adventure).map((paragraph) => {
    return (
      <Typography
        variant="body1"
        component="div"
        textAlign="justify"
        key={crypto.randomUUID()}
      >
        {paragraph}
      </Typography>
    );
  });
}

export function AdventureCardContent({
  adventure,
  showSummary,
}: AdventureCardContentProps) {
  const dictionary = useContext(DictionaryContext);
  const levelRange = createLevelRangeLabel(adventure);
  return (
    <Stack direction="column" spacing={2} alignItems="center">
      <AdventureCardHeader adventure={adventure} />
      {showSummary && <AdventureCardSummary adventure={adventure} />}
      <Grid container>
        <Grid item xs={6} md={3}>
          <Typography variant="body2" component="span">
            {dictionary.AdventureCards.cardFront.pageCount}:
          </Typography>
        </Grid>
        <Grid item xs={6} md={3}>
          <Typography variant="body2" component="span">
            {adventure.pageCount}
          </Typography>
        </Grid>
        {adventure.minLevel !== null || adventure.maxLevel !== null ? (
          <>
            <Grid item xs={6} md={3}>
              <Typography variant="body2" component="span">
                {dictionary.AdventureCards.cardFront.levelRange}:
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
    </Stack>
  );
}
