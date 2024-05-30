import { AdventureContext } from "../../../stores/AdventureContext";
import { DictionaryContext } from "@dictionaries/helpers/dictionaryContext";
import { TextField } from "@mui/material";
import { TestIds } from "@tests/testIds";
import { ChangeEvent, useContext } from "react";
import ErrorProps from "./ErrorProps";
import { AdventureFormFields } from "./AdventureFormFields";

interface AdventureFormTextProps extends ErrorProps {
  field: AdventureFormFields;
}

export default function AdventureFormInput({
  errors,
  field,
}: AdventureFormTextProps) {
  const { adventure, setAdventure } = useContext(AdventureContext);
  const dictionary = useContext(DictionaryContext);

  const getComponentConfig = (field: AdventureFormFields) => {
    switch (field) {
      case AdventureFormFields.Title:
        return {
          id: TestIds.adventureForm.fields.name,
          errorKey: "name",
          label: dictionary.AdventureForm.labels.title,
          value: adventure.name,
          handler: handleNameChange,
        };

      case AdventureFormFields.Summary:
        return {
          id: TestIds.adventureForm.fields.summary,
          errorKey: "summary",
          label: "",
          value: adventure.summary,
          handler: handleSummaryChange,
        };

      case AdventureFormFields.Image:
        return {
          id: TestIds.adventureForm.fields.image,
          errorKey: "image",
          label: dictionary.AdventureForm.labels.image,
          value: adventure.image,
          handler: handleImageChange,
        };

      case AdventureFormFields.MinLevel:
        return {
          id: TestIds.adventureForm.fields.minLevel,
          errorKey: "minLevel",
          label: dictionary.AdventureForm.labels.minLevel,
          value: adventure.minLevel,
          handler: handleMinLevelChange,
        };

      case AdventureFormFields.MaxLevel:
        return {
          id: TestIds.adventureForm.fields.maxLevel,
          errorKey: "maxLevel",
          label: dictionary.AdventureForm.labels.maxLevel,
          value: adventure.maxLevel,
          handler: handleMaxLevelChange,
        };

      case AdventureFormFields.PageCount:
        return {
          id: TestIds.adventureForm.fields.pageCount,
          errorKey: "pageCount",
          label: dictionary.AdventureForm.labels.pageCount,
          value: adventure.pageCount,
          handler: handlePageCountChange,
        };

      case AdventureFormFields.Genres:
      case AdventureFormFields.Language:
      case AdventureFormFields.Series:
      case AdventureFormFields.System:
      case AdventureFormFields.Tags:
        throw new Error("Not a valid field for this component");
    }
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAdventure({ ...adventure, name: event.target.value });
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAdventure({ ...adventure, image: event.target.value });
  };

  const handleSummaryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAdventure({ ...adventure, summary: event.target.value });
  };

  const handleMinLevelChange = (event: ChangeEvent<HTMLInputElement>) => {
    const number = Number.parseInt(event.target.value);
    setAdventure({
      ...adventure,
      minLevel: Number.isNaN(number) ? null : number,
    });
  };

  const handleMaxLevelChange = (event: ChangeEvent<HTMLInputElement>) => {
    const number = Number.parseInt(event.target.value);
    setAdventure({
      ...adventure,
      maxLevel: Number.isNaN(number) ? null : number,
    });
  };

  const handlePageCountChange = (event: ChangeEvent<HTMLInputElement>) => {
    const number = Number.parseInt(event.target.value);
    setAdventure({
      ...adventure,
      pageCount: Number.isNaN(number) ? null : number,
    });
  };

  const config = getComponentConfig(field);

  return (
    <TextField
      data-testid={config.id}
      required
      error={errors.has(config.errorKey)}
      helperText={errors.get(config.errorKey)}
      label={config.label}
      value={config.value}
      variant="standard"
      onChange={config.handler}
      sx={field === AdventureFormFields.Image ? { width: "100%" } : undefined}
      multiline={field === AdventureFormFields.Summary}
      rows={field === AdventureFormFields.Summary ? 4 : undefined}
    />
  );
}
