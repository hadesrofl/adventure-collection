"use client";

import { useActivePage } from "@toolpad/core/useActivePage";

export default function useBreadcrumb(title: string, pathname: string) {
  const activePage = useActivePage();
  if (!activePage) return { title, breadCrumbs: undefined };
  const path = `${activePage.path}/${pathname}`;
  const breadCrumbs = [...activePage.breadCrumbs, { title, path }];
  return { title, breadCrumbs };
}
