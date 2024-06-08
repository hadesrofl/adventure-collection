jest.mock("react", () => {
  const testCache = <T extends () => unknown>(func: T) => func;
  const originalModule = jest.requireActual("react");
  return {
    ...originalModule,
    cache: testCache,
  };
});
