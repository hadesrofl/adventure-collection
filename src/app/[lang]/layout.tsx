import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import CenteredBox from "@components/CenteredBox";
import React from "react";
import { lightTheme } from "../../createTheme";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { LangParam } from "../_shared/langParam";
import { getDictionary } from "@dictionaries/helpers/getDictionaries";
import DictionaryProvider from "@dictionaries/helpers/dictionaryContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Adventure Collection",
  description: "Track your TTRPG adevntures!",
};

export interface CommonLayoutProps {
  children?: React.ReactNode;
}

export default async function RootLayout({
  children,
  params,
}: CommonLayoutProps & LangParam) {
  const theme = lightTheme;
  const dictionary = await getDictionary(params.lang);
  return (
    <html lang={params.lang}>
      <body className={inter.className}>
        <ThemeProvider theme={theme}>
          <DictionaryProvider dictionary={dictionary}>
            <CenteredBox>{children}</CenteredBox>
          </DictionaryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
