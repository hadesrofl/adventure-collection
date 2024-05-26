import { CommonLayoutProps } from "../../layout";
import CenteredBox from "@components/CenteredBox";
import Card from "@mui/material/Card";

export default function AdventureCreatePageLayout({
  children,
}: CommonLayoutProps) {
  return (
    <CenteredBox width="screen">
      <Card className="p-8 w-screen md:w-1/2">{children}</Card>
    </CenteredBox>
  );
}
