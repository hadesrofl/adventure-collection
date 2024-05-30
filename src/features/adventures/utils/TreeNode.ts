export interface IPrintable {
  toString: () => string;
}

export type TreeNode<T extends IPrintable> = {
  self: T;
  children: TreeNode<T>[];
};
