import { Genre } from "@features/genres";
import PrintableGenre from "./printableGenre";
import { TreeNode } from "./TreeNode";

export function createGenreSubtree(
  parent: Genre,
  genres: Genre[]
): TreeNode<PrintableGenre> {
  const self = new PrintableGenre(parent);
  const allChildren = genres.filter((g) => g.parentId === self.id);
  if (allChildren.length === 0) return { self, children: [] };
  return {
    self,
    children: allChildren.map((g) => createGenreSubtree(g, genres)),
  };
}
