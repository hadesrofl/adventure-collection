"use server";

import { default as defaultDictionary } from "../en.json";

export type Locale = keyof typeof dictionaries;
export type Dictionary = typeof defaultDictionary;

const dictionaries = {
  en: async () => {
    return defaultDictionary;
  },
  de: async () => {
    return (await import("../de.json")).default;
  },
};

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale]();
};
