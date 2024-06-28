import { apiRoots } from "@routes/routeRoots";

export const createSystem = () => `${apiRoots.root}${apiRoots.system}`;

export const editSystem = (id: number) =>
  `${apiRoots.root}${apiRoots.system}/${id}`;

export const getSystem = (id: number) =>
  `${apiRoots.root}${apiRoots.system}/${id}`;

export const deleteSystem = (id: number) =>
  `${apiRoots.root}${apiRoots.system}/${id}`;
