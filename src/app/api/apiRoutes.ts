import {
  createAdventure,
  deleteAdventure,
  editAdventure,
  getAdventure,
} from "./_internal/adventures/adventureRoutes";

const ApiRoutes = {
  adventures: {
    createAdventure,
    editAdventure,
    getAdventure,
    deleteAdventure,
  },
};

export default ApiRoutes;
