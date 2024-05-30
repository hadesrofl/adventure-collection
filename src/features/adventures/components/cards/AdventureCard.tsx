"use client";
import { Card, Box, CardActions, CardActionArea, Drawer } from "@mui/material";

import { AdventureCardContentProps } from "./cardContent/AdventureCardContent";
import AdventureCardFooter from "./cardContent/AdventureCardFooter";
import { TestIds } from "@tests/testIds";
import { useState } from "react";
import useIsSmallScreen from "@hooks/useIsSmallScreen";
import Link from "next/link";
import AdventureCardContainer from "./cardContent/AdventureCardContainer";
import useIsMediumScreen from "@hooks/useIsMediumScreen";

export default function AdventureCard({
  adventure,
  showSummary: summaryComponent,
  href,
  fitImageToCover,
}: AdventureCardContentProps) {
  const [open, setOpen] = useState<boolean>(false);
  const isSmallScreen = useIsSmallScreen();
  const isMediumScreen = useIsMediumScreen();

  const handleCardClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const adventureContainer = (
    <AdventureCardContainer
      adventure={adventure}
      showSummary={summaryComponent}
      fitImageToCover={fitImageToCover || !summaryComponent}
    />
  );

  function showCardContent() {
    const cardContentShowSummary = adventureContainer;

    const cardContentSmallScreen = (
      <CardActionArea>
        <Link
          href={href ?? ""}
          data-testid={TestIds.adventureCard.primaryAction}
        >
          {adventureContainer}
        </Link>
      </CardActionArea>
    );

    const cardContentLargeScreen = (
      <CardActionArea onClick={handleCardClick}>
        {adventureContainer}
      </CardActionArea>
    );

    if (summaryComponent) return cardContentShowSummary;
    else if (isSmallScreen && href) return cardContentSmallScreen;
    else if (!isSmallScreen) return cardContentLargeScreen;
  }

  return (
    <>
      <Card
        data-testid={TestIds.adventureCard.card(adventure.id)}
        className="w-full md:min-w-[500px] md:max-w-[600px] justify-between"
      >
        {showCardContent()}

        <CardActions>
          <AdventureCardFooter adventure={adventure} />
        </CardActions>
      </Card>
      {!isSmallScreen && (
        <Drawer open={open} onClose={handleClose} anchor="right">
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              minWidth: isMediumScreen ? "45vw" : "0vw",
            }}
          >
            <AdventureCard
              adventure={adventure}
              showSummary
              fitImageToCover={true}
            />
          </Box>
        </Drawer>
      )}
    </>
  );
}
