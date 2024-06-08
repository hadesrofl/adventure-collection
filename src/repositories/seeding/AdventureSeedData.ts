import { Languages } from "@domain/models/languages";

export interface AdventureSeedData {
  name: string;
  summary: string;
  tags: string[];
  system: string;
  genres: string[];
  language: Languages;
  image?: string;
  pageCount?: number;
  minLevel?: number;
  maxLevel?: number;
  series?: string;
}
