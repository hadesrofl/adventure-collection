import {
  createAdventure,
  deleteAdventure,
  editAdventure,
  getAdventure,
} from "./adventureRoutes";
import {
  createSeries,
  editSeries,
  getSeries,
  deleteSeries,
} from "./seriesRoutes";

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
