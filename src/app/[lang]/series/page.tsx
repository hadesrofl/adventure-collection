import { SeriesGallery, NoSeriesDialog } from "@features/series";
import dbContext from "@repositories/dbContext";
import { getDictionary } from "@dictionaries/helpers/getDictionaries";
import { LangParam } from "@app/_shared/langParam";
import { System } from "@features/systems";

export default async function SeriesGalleryPage({ params }: LangParam) {
  const series = await dbContext.series.list();
  const dictionary = await getDictionary(params.lang);
  const doSeriesExist = series.length > 0;
  let systems: System[] = [];
  if (!doSeriesExist) systems = await dbContext.systems.list();
  return doSeriesExist ? (
    <SeriesGallery className="m-4" series={series} dictionary={dictionary} />
  ) : (
    <NoSeriesDialog systems={systems} />
  );
}
