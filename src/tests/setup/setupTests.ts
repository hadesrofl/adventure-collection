import "@testing-library/jest-dom";
import { mockFetch } from "../mocks/fetch";

Object.defineProperty(globalThis, "crypto", {
  value: {
    randomUUID: () => Math.random() * 100,
  },
});

Object.defineProperty(globalThis, "fetch", {
  value: mockFetch,
});
