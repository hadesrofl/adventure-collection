import "@testing-library/jest-dom";
import { mockFetch } from "../mocks/fetch";

Object.defineProperty(global, "crypto", {
  value: {
    randomUUID: () => Math.random() * 100,
  },
});

Object.defineProperty(global, "fetch", {
  value: mockFetch,
});
