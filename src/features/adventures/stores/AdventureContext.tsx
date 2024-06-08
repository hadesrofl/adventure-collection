"use client";

import { buildAdventureSkeleton } from "../types/factories/AdventureFactory";
import { AdventureFull } from "../types/adventure";
import { ReactNode, createContext } from "react";

export const AdventureContext = createContext<{
  adventure: AdventureFull;
  setAdventure: (adventure: AdventureFull) => void;
}>({
  adventure: buildAdventureSkeleton(),
  // default implementation
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setAdventure: (adventure: AdventureFull) => {},
});

interface AdventureProviderProps {
  adventure: AdventureFull;
  setAdventure: (adventure: AdventureFull) => void;
  children: ReactNode;
}

export function AdventureProvider({
  adventure,
  setAdventure,
  children,
}: AdventureProviderProps) {
  return (
    <AdventureContext.Provider value={{ adventure, setAdventure }}>
      {children}
    </AdventureContext.Provider>
  );
}
