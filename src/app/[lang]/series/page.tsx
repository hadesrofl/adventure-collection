import {
  SeriesGallery,
  NoSeriesDialog,
  seriesRepository,
} from "@features/series";
import { getDictionary } from "@dictionaries/helpers/getDictionaries";
import { LangParam } from "@app/_shared/langParam";
import { System, systemRepository } from "@features/systems";

export default async function SeriesGalleryPage({ params }: LangParam) {
  const series = await seriesRepository.list();
  const dictionary = await getDictionary(params.lang);
  const doSeriesExist = series.length > 0;
  let systems: System[] = [];
  if (!doSeriesExist) systems = await systemRepository.list();
  return doSeriesExist ? (
    <SeriesGallery className="m-4" series={series} dictionary={dictionary} />
  ) : (
    <NoSeriesDialog systems={systems} />
  );
}
