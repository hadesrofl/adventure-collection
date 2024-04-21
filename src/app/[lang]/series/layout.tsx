import { CommonLayoutProps } from "../layout";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import React from "react";
import CenteredBox from "@components/lib/CenteredBox";
import { LangParam } from "@app/_shared/langParam";

export default async function SeriesGalleryLayout({
  children,
  params,
}: CommonLayoutProps & LangParam) {
  return (
    <Stack className="w-full">
      <CenteredBox>
        <Card className="w-5/6 md:w-1/2 self-center">{children}</Card>
      </CenteredBox>
    </Stack>
  );
}
