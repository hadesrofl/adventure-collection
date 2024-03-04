import { AdventureContext } from "@contexts/AdventureContext";
import { DictionaryContext } from "@dictionaries/helpers/dictionaryContext";
import { FormControl, TextField, MenuItem } from "@mui/material";
import { Language } from "@prisma/client";
import { TestIds } from "@tests/testIds";
import { useContext, ChangeEvent } from "react";
import ErrorProps from "./ErrorProps";

interface LanguageSelectionProps extends ErrorProps {}

function isLanguage(value: string): value is Language {
  return Object.keys(Language).includes(value);
}

export default function LanguageSelection({ errors }: LanguageSelectionProps) {
  const { adventure, setAdventure } = useContext(AdventureContext);
  const dictionary = useContext(DictionaryContext);

  const handleLanguageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const language = Object.entries(dictionary.Languages).find(
      (entry) => entry[1] === event.target.value
    );
    if (language && isLanguage(language[0]))
      setAdventure({ ...adventure, language: language[0] });
  };

  return (
    <FormControl fullWidth>
      <TextField
        required
        data-testid={TestIds.adventureForm.fields.language}
        value={
          dictionary === undefined
            ? ""
            : dictionary.Languages[adventure.language]
        }
        error={errors.has("language")}
        helperText={errors.get("language")}
        variant="outlined"
        select
        onChange={handleLanguageChange}
        label={dictionary.AdventureForm.labels.languages}
      >
        {Object.values(Language).map((language) => (
          <MenuItem
            key={crypto.randomUUID()}
            value={dictionary.Languages[language]}
          >
            {dictionary.Languages[language]}
          </MenuItem>
        ))}
      </TextField>
    </FormControl>
  );
}
