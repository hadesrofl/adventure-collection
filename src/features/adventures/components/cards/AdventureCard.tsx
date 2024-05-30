"use client";
import { Card, Box, CardActions, CardActionArea, Drawer } from "@mui/material";

import { AdventureCardContentProps } from "./cardContent/AdventureCardContent";
import AdventureCardFooter from "./cardContent/AdventureCardFooter";
import { TestIds } from "@tests/testIds";
import { useState } from "react";
import useIsSmallScreen from "@hooks/useIsSmallScreen";
import Link from "next/link";
import AdventureCardContainer from "./cardContent/AdventureCardContainer";

export default function AdventureCard({
  adventure,
  showSummary: summaryComponent,
  href,
}: AdventureCardContentProps) {
  const [open, setOpen] = useState<boolean>(false);
  const isSmallScreen = useIsSmallScreen();

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
    />
  );

  return (
    <>
      <Card
        data-testid={TestIds.adventureCard.card(adventure.id)}
        className="md:max-w-[600px] justify-between"
      >
        {isSmallScreen && href ? (
          <CardActionArea>
            <Link href={href} data-testid={TestIds.adventureCard.primaryAction}>
              {adventureContainer}
            </Link>
          </CardActionArea>
        ) : (
          <CardActionArea onClick={handleCardClick}>
            {adventureContainer}
          </CardActionArea>
        )}

        <CardActions>
          <AdventureCardFooter adventure={adventure} />
        </CardActions>
      </Card>
      {!isSmallScreen && (
        <Drawer open={open} onClose={handleClose} anchor="right">
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <AdventureCard adventure={adventure} showSummary />
          </Box>
        </Drawer>
      )}
    </>
  );
}
