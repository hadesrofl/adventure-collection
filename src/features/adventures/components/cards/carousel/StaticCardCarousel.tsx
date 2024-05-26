import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import ArrowBack from "@mui/icons-material/ArrowBack";
import ArrowForward from "@mui/icons-material/ArrowForward";
import { notFound } from "next/navigation";
import Link from "next/link";
import { AdventureFull } from "../../../types/adventure";
import AdventureCard from "../AdventureCard";
import { TestIds } from "@tests/testIds";

export interface StaticCardCarouselProps {
  adventure: AdventureFull | undefined;
  width?: "1/2" | "full" | "screen";
  previousCardHref?: string;
  nextCardHref?: string;
}

export default function StaticCardCarousel({
  adventure,
  width = "screen",
  previousCardHref,
  nextCardHref,
}: StaticCardCarouselProps) {
  return adventure === undefined ? (
    notFound()
  ) : (
    <Stack
      className={`w-${width} flex items-stretch`}
      justifyContent="center"
      direction="row"
      spacing={4}
    >
      {previousCardHref && (
        <Link
          href={previousCardHref}
          className="self-center"
          data-testid={TestIds.adventureCardCarousel.buttons.previousCard}
        >
          <IconButton>
            <ArrowBack />
          </IconButton>
        </Link>
      )}

      <AdventureCard adventure={adventure} showSummary={true} />

      {nextCardHref && (
        <Link
          href={nextCardHref}
          className="self-center"
          data-testid={TestIds.adventureCardCarousel.buttons.nextCard}
        >
          <IconButton>
            <ArrowForward />
          </IconButton>
        </Link>
      )}
    </Stack>
  );
}
