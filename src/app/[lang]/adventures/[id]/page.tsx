import IdParamProps from "@app/_shared/idParam";
import { loadAdventure, StaticCardCarousel } from "@features/adventures";

export default async function AdventureDetailPage({
  params: { id },
}: IdParamProps) {
  const adventure = await loadAdventure(Number.parseInt(id));
  return <StaticCardCarousel adventure={adventure} />;
}
