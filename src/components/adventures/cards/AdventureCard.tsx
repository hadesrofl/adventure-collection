"use client";
import {
  Card,
  CardMedia,
  Box,
  CardContent,
  CardActions,
  CardActionArea,
} from "@mui/material";
import Image from "next/image";
import {
  AdventureCardContent,
  AdventureCardContentProps,
} from "./cardContent/AdventureCardContent";
import Link from "next/link";
import AdventureCardFooter from "./cardContent/AdventureCardFooter";
import { TestIds } from "@tests/testIds";

function AdventureDetailCardWrapper({
  adventure,
  showSummary: summaryComponent,
}: AdventureCardContentProps) {
  return (
    <>
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
      <CardContent className="flex justify-center mt-1">
        <AdventureCardContent
          adventure={adventure}
          showSummary={summaryComponent}
        />
      </CardContent>
    </>
  );
}

export default function AdventureCard({
  adventure,
  showSummary: summaryComponent,
  href,
}: AdventureCardContentProps) {
  return (
    <Card
      data-testid={TestIds.adventureCard.card(adventure.id)}
      className="w-screen md:max-w-[600px] flex flex-col justify-between"
    >
      {href ? (
        <CardActionArea>
          <Link href={href} data-testid={TestIds.adventureCard.primaryAction}>
            <AdventureDetailCardWrapper
              adventure={adventure}
              showSummary={summaryComponent}
            />
          </Link>
        </CardActionArea>
      ) : (
        <AdventureDetailCardWrapper
          adventure={adventure}
          showSummary={summaryComponent}
        />
      )}

      <CardActions>
        <AdventureCardFooter adventure={adventure} />
      </CardActions>
    </Card>
  );
}
