import fs from "fs";

jest.mock("fs");

export const fsReadFileSyncMock = fs.readFileSync as jest.Mock;
