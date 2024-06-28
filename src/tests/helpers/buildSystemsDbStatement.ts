import { Adventure } from "@domain/models/adventure";
import { System, SystemFull, systemIncludes } from "@features/systems";

export function buildSystemDbStatement(
  system: System | SystemFull,
  connectAdventures?: Adventure[],
  disconnectAdventures?: Adventure[]
) {
  return {
    data: {
      ...system,
      adventures: {
        connect: connectAdventures,
        disconnect: disconnectAdventures,
      },
    },
    include: systemIncludes,
  };
}
