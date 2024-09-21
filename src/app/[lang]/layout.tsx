import type { Metadata } from "next";
import "../globals.css";
import React from "react";
import { Inter } from "next/font/google";
import { appTheme } from "../../createTheme";
import { LangParam } from "../_shared/langParam";
import { getDictionary } from "@dictionaries/helpers/getDictionaries";
import DictionaryProvider from "@dictionaries/helpers/dictionaryContext";
import { AppProvider, Branding } from "@toolpad/core";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import Book from "@mui/icons-material/Book";
import getNavigationEntries from "./getNavigationEntries";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Adventure Collection",
  description: "Track your TTRPG adevntures!",
};

export interface CommonLayoutProps {
  children?: React.ReactNode;
}

const branding: Branding = {
  title: "Adventure Collection",
  logo: <Book sx={{ marginTop: "10px" }} />,
};

export default async function RootLayout({
  children,
  params,
}: CommonLayoutProps & LangParam) {
  const theme = appTheme;
  const dictionary = await getDictionary(params.lang);
  return (
    <html lang={params.lang}>
      <body className={inter.className}>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <AppProvider
            navigation={getNavigationEntries(dictionary)}
            branding={branding}
            theme={theme}
          >
            <DictionaryProvider dictionary={dictionary}>
              {children}
            </DictionaryProvider>
          </AppProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
