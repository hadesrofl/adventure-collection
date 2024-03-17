export default function acceptAnythingForProperties<T>(
  data: T,
  properties: string[]
) {
  let returnData: T = data;
  properties.forEach((property) => {
    returnData = { ...returnData, [property]: expect.anything() };
  });
  return returnData;
}
