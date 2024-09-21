import { CommonLayoutProps } from "../../../../layout";
import Card from "@mui/material/Card";
import IdParamProps from "@app/_shared/idParam";
import { adventureRepository } from "@features/adventures/repositoryExports";
import AppPageContainer from "@components/AppPageContainer";

export default async function AdventureEditPageLayout({
  children,
  params,
}: CommonLayoutProps & IdParamProps) {
  const adventure = await adventureRepository.getById(
    Number.parseInt(params.id)
  );
  const title = adventure.name;

  return (
    <AppPageContainer title={title} pathname={params.id}>
      <Card>{children}</Card>
    </AppPageContainer>
  );
}
