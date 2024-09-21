import { DashboardLayout } from "@toolpad/core";
import { CommonLayoutProps } from "../layout";

export default function DashboardPagesLayout({ children }: CommonLayoutProps) {
  return (
    <DashboardLayout disableCollapsibleSidebar>{children}</DashboardLayout>
  );
}
