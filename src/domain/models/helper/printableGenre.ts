import { Genre } from "@prisma/client";
import { IPrintable } from "./TreeNode";

export default class PrintableGenre implements IPrintable, Genre {
  constructor(genre: Genre) {
    this.createdAt = genre.createdAt;
    this.id = genre.id;
    this.name = genre.name;
    this.parentId = genre.parentId;
  }

  id: number;
  name: string;
  createdAt: Date;
  parentId: number | null;

  toString() {
    return this.name;
  }
}
