"use client";

import { CommonLayoutProps } from "@app/[lang]/layout";
import useBreadcrumb from "@hooks/useBreadcrumb";
import { PageContainer } from "@toolpad/core";

interface AppPageContainerProps extends CommonLayoutProps {
  title: string;
  pathname: string;
}

export default function AppPageContainer({
  children,
  title: inputTitle,
  pathname,
}: AppPageContainerProps) {
  const { title, breadCrumbs } = useBreadcrumb(inputTitle, pathname);
  return (
    <PageContainer title={title} breadCrumbs={breadCrumbs} maxWidth={false}>
      {children}
    </PageContainer>
  );
}
