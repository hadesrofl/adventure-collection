import { Grid, Typography, Box, Stack } from "@mui/material";
import AdventureCardHeader from "./AdventureCardHeader";
import { Adventure } from "@prisma/client";
import { useContext } from "react";
import { DictionaryContext } from "@dictionaries/helpers/dictionaryContext";
import { AdventureCardCommonProps } from "./AdventureCardCommonProps";
import { getSummaryParagraphs } from "../../../types/adventure";
import { TestIds } from "@tests/testIds";
import useIsMediumScreen from "@hooks/useIsMediumScreen";
import useIsSmallScreen from "@hooks/useIsSmallScreen";

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
  fitImageToCover?: boolean;
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
  const isMediumScreen = useIsMediumScreen();
  const isSmallScreen = useIsSmallScreen();
  const largerScreenMaxWidth = isMediumScreen ? "55vw" : "25vw";
  const maxWidth = isSmallScreen ? "100vw" : largerScreenMaxWidth;
  return (
    <Stack
      direction="column"
      spacing={2}
      alignItems="center"
      maxWidth={maxWidth}
    >
      <AdventureCardHeader adventure={adventure} />
      {showSummary && <AdventureCardSummary adventure={adventure} />}
      <Grid
        data-testid={TestIds.adventureCard.content(adventure.id)}
        container
        textAlign="center"
      >
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
