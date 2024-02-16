export const logSpy = jest.spyOn(global.console, "log");
// silence logs
logSpy.mockImplementation();
