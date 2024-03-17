"use client";

import { buildAdventureSkeleton } from "@domain/factories/AdventureFactory";
import { AdventureFull } from "@domain/models/adventure";
import { ReactNode, createContext } from "react";

export const AdventureContext = createContext<{
  adventure: AdventureFull;
  setAdventure: (adventure: AdventureFull) => void;
}>({
  adventure: buildAdventureSkeleton(),
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
