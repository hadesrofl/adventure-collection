import { CommonLayoutProps } from "../../layout";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CenteredBox from "@components/CenteredBox";
import { LangParam } from "@app/_shared/langParam";
import AppPageContainer from "@components/AppPageContainer";
import { getDictionary } from "@dictionaries/helpers/getDictionaries";

export default async function SystemGalleryLayout({
  children,
  params,
}: CommonLayoutProps & LangParam) {
  const dictionary = await getDictionary(params.lang);
  return (
    <AppPageContainer title={dictionary.SystemGallery.title} pathname="">
      <Stack className="w-full">
        <CenteredBox>
          <Card className="w-5/6 md:w-1/2 self-center">{children}</Card>
        </CenteredBox>
      </Stack>
    </AppPageContainer>
  );
}
