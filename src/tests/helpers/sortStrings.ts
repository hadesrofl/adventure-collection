import { SortingOrder } from "@domain/models/helper/SortingOrder";

export default function sortStrings(
  text: string,
  otherText: string,
  order: SortingOrder = SortingOrder.Ascending
): number {
  if (order === SortingOrder.Ascending) return text > otherText ? 1 : -1;
  return text > otherText ? -1 : 1;
}
