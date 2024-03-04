import { Genre } from "./models/genre";
import PrintableGenre from "./models/helper/printableGenre";
import { TreeNode } from "./models/helper/TreeNode";

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
