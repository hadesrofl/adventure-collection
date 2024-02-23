import { useRouter, usePathname, useSearchParams } from "next/navigation";

export const mockUseRouter = {
  push: jest.fn(),
  prefetch: jest.fn(),
  refresh: jest.fn(),
};
export const mockUsePathname = jest.fn();
export const mockUseSearchParams = {
  has: jest.fn(),
  getAll: jest.fn(),
};

jest.mock("next/navigation");

(useRouter as jest.Mock).mockReturnValue(mockUseRouter);
(usePathname as jest.Mock).mockReturnValue("");
(useSearchParams as jest.Mock).mockReturnValue(mockUseSearchParams);
