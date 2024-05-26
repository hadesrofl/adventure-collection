/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: "v8",
  coverageReporters: ["cobertura", "json", "html", "text-summary"],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.page.{ts,tsx}",
    "!src/tests/**/*.{ts,tsx}",
  ],
  clearMocks: true,
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@public/(.*)$": "<rootDir>/public/$1",
    "^@app/(.*)$": "<rootDir>/src/app/$1",
    "^@components/(.*)$": "<rootDir>/src/components/$1",
    "^@domain/(.*)$": "<rootDir>/src/domain/$1",
    "^@dictionaries/(.*)$": "<rootDir>/src/dictionaries/$1",
    "^@features/(.*)$": "<rootDir>/src/features/$1",
    "^@hooks/(.*)$": "<rootDir>/src/hooks/$1",
    "^@repositories/(.*)$": "<rootDir>/src/repositories/$1",
    "^@routes/(.*)$": "<rootDir>/src/routes/$1",
    "^@tests/(.*)$": "<rootDir>/src/tests/$1",
    "^@utils/(.*)$": "<rootDir>/src/utils/$1",
  },
  // Add more setup options before each test is run
  setupFilesAfterEnv: [
    "<rootDir>/src/tests/setup/setupTests.ts",
    "<rootDir>/src/tests/setup/react.ts",
    "<rootDir>/src/tests/setup/prisma.ts",
    "<rootDir>/src/tests/setup/nextNavigation.ts",
  ],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
