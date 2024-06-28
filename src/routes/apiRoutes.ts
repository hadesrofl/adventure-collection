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
import {
  createSystem,
  editSystem,
  getSystem,
  deleteSystem,
} from "./systemRoutes";

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
  systems: {
    createSystem,
    editSystem,
    getSystem,
    deleteSystem,
  },
};

export default ApiRoutes;
