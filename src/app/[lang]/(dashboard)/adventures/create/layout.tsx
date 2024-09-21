import AppPageContainer from "@components/AppPageContainer";
import { CommonLayoutProps } from "../../../layout";
import Card from "@mui/material/Card";
import { getDictionary } from "@dictionaries/helpers/getDictionaries";
import { LangParam } from "@app/_shared/langParam";

export default async function AdventureCreatePageLayout({
  children,
  params,
}: CommonLayoutProps & LangParam) {
  const dictionary = await getDictionary(params.lang);
  return (
    <AppPageContainer
      title={dictionary.PageTitles.CreateAdventure}
      pathname={dictionary.PageTitles.CreateAdventure}
    >
      <Card>{children}</Card>
    </AppPageContainer>
  );
}
