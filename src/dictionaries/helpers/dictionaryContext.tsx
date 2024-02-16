"use client";

import { ReactNode, createContext } from "react";
import { default as defaultDictionary } from "../en.json";
import { Dictionary } from "./getDictionaries";

export const DictionaryContext = createContext(defaultDictionary);

interface DictionaryProviderProps {
  dictionary: Dictionary;
  children: ReactNode;
}

export default function DictionaryProvider({
  dictionary,
  children,
}: DictionaryProviderProps) {
  return (
    <DictionaryContext.Provider value={dictionary}>
      {children}
    </DictionaryContext.Provider>
  );
}
