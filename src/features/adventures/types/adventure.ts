import { Adventure } from "@domain/models/adventure";
import { Prisma } from "@prisma/client";

export const adventureIncludes = {
  tags: true,
  system: true,
  genres: true,
  series: true,
};

export type AdventureFull = Prisma.AdventureGetPayload<{
  include: { tags: true; system: true; genres: true; series: true };
}>;

export const getSummaryParagraphs = (adventure: Adventure) =>
  adventure.summary.split("\n");

export const minifySummary = (adventure: Adventure, maxWords: number) => {
  let usedWords = 0;
  const minifiedSummary: string[] = [];
  const summaryParagraphs = getSummaryParagraphs(adventure);

  if (summaryParagraphs.length === 0)
    minifiedSummary.push(
      adventure.summary.split(" ").slice(0, maxWords).join(" ") + " ..."
    );

  summaryParagraphs.forEach((paragraph) => {
    const words = paragraph.split(" ");
    if (usedWords >= maxWords) return;
    if (words.length + usedWords < maxWords) {
      minifiedSummary.push(words.join(" "));
      usedWords += words.length;
    } else {
      const remainingWordCount = maxWords - usedWords;
      minifiedSummary.push(
        words.slice(0, remainingWordCount).join(" ") + "..."
      );
      usedWords += remainingWordCount;
    }
  });
  return minifiedSummary;
};

export function isAdventureFull(adventure: any): adventure is AdventureFull {
  return (adventure as AdventureFull).system !== undefined;
}
