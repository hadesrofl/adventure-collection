import { AdventureContext } from "@contexts/AdventureContext";
import { DictionaryContext } from "@dictionaries/helpers/dictionaryContext";
import { FormControl, TextField, MenuItem } from "@mui/material";
import { System } from "@prisma/client";
import { TestIds } from "@tests/testIds";
import { useContext, ChangeEvent } from "react";
import ErrorProps from "./ErrorProps";

interface SystemSelectionProps extends ErrorProps {
  systemOptions: System[];
}

export default function SystemSelection({
  errors,
  systemOptions,
}: SystemSelectionProps) {
  const { adventure, setAdventure } = useContext(AdventureContext);
  const dictionary = useContext(DictionaryContext);

  const handleSystemChange = (event: ChangeEvent<HTMLInputElement>) => {
    const system = systemOptions.find(
      (s) => s.id === Number.parseInt(event.target.value)
    );
    if (!system || adventure.systemId === system.id) return;
    setAdventure({
      ...adventure,
      system,
      systemId: system.id,
      series: null,
      seriesId: null,
    });
  };

  return (
    <FormControl fullWidth>
      <TextField
        data-testid={TestIds.adventureForm.fields.system}
        value={adventure.system.id}
        error={errors.has("systemId")}
        helperText={errors.get("systemId")}
        variant="outlined"
        select
        required
        onChange={handleSystemChange}
        label={dictionary.AdventureForm.labels.systems}
      >
        {systemOptions.map((system) => (
          <MenuItem key={crypto.randomUUID()} value={system.id}>
            {system.name}
          </MenuItem>
        ))}
      </TextField>
    </FormControl>
  );
}
