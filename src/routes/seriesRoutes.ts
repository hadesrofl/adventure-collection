import { apiRoots } from "@routes/routeRoots";

export const createSeries = () => `${apiRoots.root}${apiRoots.series}`;

export const editSeries = (id: number) =>
  `${apiRoots.root}${apiRoots.series}/${id}`;

export const getSeries = (id: number) => `${apiRoots.root}${apiRoots.series}/${id}`;

export const deleteSeries = (id: number) =>
  `${apiRoots.root}${apiRoots.series}/${id}`;
