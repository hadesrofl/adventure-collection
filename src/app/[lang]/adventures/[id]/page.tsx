import IdParamProps from "@app/_shared/idParam";
import { loadAdventure } from "@app/api/_actions/adventures/loadAdventures";
import StaticCardCarousel from "@components/adventures/cards/carousel/StaticCardCarousel";

export default async function AdventureDetailPage({
  params: { id },
}: IdParamProps) {
  const adventure = await loadAdventure(Number.parseInt(id));
  return <StaticCardCarousel adventure={adventure} />;
}
