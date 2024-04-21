import {
  createAdventure,
  deleteAdventure,
  editAdventure,
  getAdventure,
} from "./_internal/adventures/adventureRoutes";
import {
  createSeries,
  editSeries,
  getSeries,
  deleteSeries,
} from "./_internal/series/seriesRoutes";

const ApiRoutes = {
  adventures: {
    createAdventure,
    editAdventure,
    getAdventure,
    deleteAdventure,
  },
  series: {
    createSeries,
    editSeries,
    getSeries,
    deleteSeries,
  },
};

export default ApiRoutes;
