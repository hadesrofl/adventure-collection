import SeriesGallery from "@components/series/SeriesGallery/SeriesGallery";
import dbContext from "../../api/_internal/shared/db/dbContext";
import NoSeriesDialog from "@components/series/dialog/NoSeriesDialog/NoSeriesDialog";
import { getDictionary } from "@dictionaries/helpers/getDictionaries";
import { LangParam } from "@app/_shared/langParam";
import { System } from "@domain/models/system";

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
