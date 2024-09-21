const appRoot = "/";
const adventureRoot = "/adventures";

const adventureShowRoute = (id: number) => `${adventureRoot}/${id}`;
const adventureRoutes = {
  collection: adventureRoot,
  show: adventureShowRoute,
  create: `${adventureRoot}/create`,
  edit: (id: number) => `${adventureRoot}/edit/${id}`,
};

const AppRoutes = { appRoot, adventureRoutes };

export default AppRoutes;
