const appRoot = "/";
const adventureRoot = "/adventures";

const adventureShowRoute = (id: number) => `${adventureRoot}/${id}`;
const adventureRoutes = {
  collection: appRoot,
  show: adventureShowRoute,
  create: `${adventureRoot}/create`,
};

const AppRoutes = { appRoot, adventureRoutes };

export default AppRoutes;
