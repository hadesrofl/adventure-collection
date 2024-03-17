import { loadSeries } from "@app/api/_actions/series/loadSeries";
import { AdventureContext } from "@contexts/AdventureContext";
import { DictionaryContext } from "@dictionaries/helpers/dictionaryContext";
import { FormControl, TextField, MenuItem } from "@mui/material";
import { Series } from "@prisma/client";
import { TestIds } from "@tests/testIds";
import { useContext, ChangeEvent, useEffect, useState } from "react";
import ErrorProps from "./ErrorProps";

interface SeriesSelectionProps extends ErrorProps {}

export default function SeriesSelection({ errors }: SeriesSelectionProps) {
  const { adventure, setAdventure } = useContext(AdventureContext);
  const dictionary = useContext(DictionaryContext);
  const [series, setSeries] = useState<Series[]>([]);

  useEffect(() => {
    if (adventure.system && adventure.system.id > 0)
      loadSeries({ systemId: adventure.system.id }).then((series) =>
        setSeries(series)
      );
  }, [adventure.system]);

  const handleSeriesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const seriesId = event.target.value;
    setAdventure({
      ...adventure,
      seriesId: Number.parseInt(seriesId),
      series: series.find((s) => s.id === Number.parseInt(seriesId)) ?? null,
    });
  };

  return (
    <FormControl fullWidth>
      <TextField
        data-testid={TestIds.adventureForm.fields.series}
        value={adventure.seriesId ?? 0}
        error={errors.has("seriesId")}
        helperText={errors.get("seriesId")}
        variant="outlined"
        select
        disabled={series.length === 0}
        onChange={handleSeriesChange}
        label={dictionary.AdventureForm.labels.series}
      >
        <MenuItem value={0}>{dictionary.AdventureForm.labels.none}</MenuItem>
        {series.map((s) => (
          <MenuItem key={crypto.randomUUID()} value={s.id}>
            {s.name}
          </MenuItem>
        ))}
      </TextField>
    </FormControl>
  );
}
