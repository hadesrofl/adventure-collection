import { CommonLayoutProps } from "../../layout";
import CenteredBox from "@components/lib/CenteredBox";
import Card from "@mui/material/Card";

export default function AdventureEditPageLayout({
  children,
}: CommonLayoutProps) {
  return (
    <CenteredBox width="screen">
      <Card className="p-8 w-screen md:w-1/2">{children}</Card>
    </CenteredBox>
  );
}
