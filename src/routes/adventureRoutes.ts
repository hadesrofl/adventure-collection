import { apiRoots } from "@routes/routeRoots";

export const createAdventure = () => `${apiRoots.root}${apiRoots.adventures}`;

export const editAdventure = (id: number) =>
  `${apiRoots.root}${apiRoots.adventures}/${id}`;

export const getAdventure = (id: number) =>
  `${apiRoots.root}${apiRoots.adventures}/${id}`;

export const deleteAdventure = (id: number) =>
  `${apiRoots.root}${apiRoots.adventures}/${id}`;
