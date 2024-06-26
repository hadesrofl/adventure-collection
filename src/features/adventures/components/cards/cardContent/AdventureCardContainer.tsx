import { CardMedia, Box, CardContent } from "@mui/material";
import {
  AdventureCardContentProps,
  AdventureCardContent,
} from "./AdventureCardContent";
import Image from "next/image";

export default function AdventureCardContainer({
  adventure,
  showSummary: summaryComponent,
  fitImageToCover,
}: AdventureCardContentProps) {
  return (
    <>
      {adventure.image ? (
        <CardMedia
          component="div"
          sx={{
            display: "flex",
            width: "auto",
            height: "70vh",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <Image
            src={adventure.image}
            alt=""
            fill
            style={{ objectFit: fitImageToCover ? "cover" : "contain" }}
          />
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
