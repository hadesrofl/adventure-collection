"use client";

import CancelIcon from "@mui/icons-material/Cancel";
import { Autocomplete, Box, Chip, Grid, Stack, TextField } from "@mui/material";
import { SyntheticEvent, useState } from "react";

interface AutoCompleteLabelProps {
  data: string;
  handleDelete: (value: string) => void;
}

const AutoCompleteLabel = ({ data, handleDelete }: AutoCompleteLabelProps) => {
  return (
    <Chip
      label={data}
      onDelete={() => handleDelete(data)}
      deleteIcon={
        <CancelIcon
          sx={{ cursor: "pointer" }}
          onMouseDown={(event) => event.stopPropagation()}
        />
      }
    />
  );
};

interface AutoCompleteWithLabelsProps {
  testId?: string;
  initSelection?: string[];
  onChange: (texts: string[]) => void;
  options: string[];
  title?: string;
}

export default function AutoCompleteWithLabels({
  testId,
  onChange,
  options,
  title,
  initSelection,
}: AutoCompleteWithLabelsProps) {
  const label = title ?? "Input";
  const [texts, setTexts] = useState<string[]>(initSelection ?? []);
  const [currentInput, setCurrentInput] = useState<string>("");
  const [typing, setTyping] = useState<NodeJS.Timeout>();
  const DebounceTimeInMs = 750;

  const handleDelete = (value: string) => {
    const newTexts = texts.filter((val) => val !== value);
    handleChange(newTexts);
  };

  const handleChange = (latestTexts: string[]) => {
    setTexts(latestTexts);
    onChange(latestTexts);
    setCurrentInput("");
  };

  const updateCurrentInput = (newValue: string) => {
    if (newValue && texts.includes(newValue) === false) {
      handleChange([...texts, newValue]);
    }
  };

  const onValueChange = (
    _event: SyntheticEvent<Element, Event>,
    newValue: string
  ) => {
    if (typing) clearTimeout(typing);

    setCurrentInput(newValue);
    setTyping(
      setTimeout(() => {
        updateCurrentInput(newValue);
        setTyping(undefined);
      }, DebounceTimeInMs)
    );
  };

  const onBlur = () => setCurrentInput("");

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Autocomplete
        data-testid={testId}
        inputValue={currentInput}
        onInputChange={onValueChange}
        options={options.filter((option) => texts.includes(option) === false)}
        filterSelectedOptions
        getOptionLabel={(option) => {
          if (typeof option === "string") return option;
          return "";
        }}
        onBlur={onBlur}
        fullWidth
        handleHomeEndKeys
        autoSelect
        freeSolo
        size="small"
        renderOption={(props, option: string | { name: string }) => (
          <li {...props}>
            {typeof option === "string" ? option : option.name}
          </li>
        )}
        renderInput={(params) => (
          <Stack spacing={2}>
            <Box>
              <Grid container spacing={2}>
                {texts.map((data) => {
                  return (
                    <Grid item xs={6} md={3} key={crypto.randomUUID()}>
                      <AutoCompleteLabel
                        data={data}
                        handleDelete={handleDelete}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
            <TextField {...params} label={label} />
          </Stack>
        )}
      />
    </Box>
  );
}
