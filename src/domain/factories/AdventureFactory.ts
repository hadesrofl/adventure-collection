import { AdventureFull } from "@domain/models/adventure";
import { Genre } from "@domain/models/genre";
import { Languages } from "@domain/models/languages";
import { Series } from "@domain/models/series";
import { System } from "@domain/models/system";
import { Tag } from "@prisma/client";

export function buildAdventure(
  name: string,
  summary: string,
  systemId: number,
  system: System,
  genres: Genre[],
  tags: Tag[],
  language: Languages,
  image: string | null = null,
  pageCount: number | null = null,
  minLevel: number | null = null,
  maxLevel: number | null = null,
  series: Series | null = null
): AdventureFull {
  return {
    id: 0,
    systemId,
    system,
    image,
    language,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
    alreadyPlayed: false,
    pageCount,
    minLevel,
    maxLevel,
    name,
    summary,
    genres,
    tags,
    seriesId: series !== null ? series.id : null,
    series,
  };
}

export function buildAdventureSkeleton(): AdventureFull {
  return buildAdventure(
    "",
    "",
    0,
    { id: 0, name: "", createdAt: new Date(Date.now()) },
    [],
    [],
    "English"
  );
}
