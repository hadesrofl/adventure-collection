import React, { useState } from "react";
import {
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  Stack,
  Chip,
  ListSubheader,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { IPrintable, TreeNode } from "../../../utils/TreeNode";

interface MultiSelectProps<T extends IPrintable> {
  id?: string;
  testId?: string;
  label: string;
  selectOptions: TreeNode<T>[];
  selectedOptions: string[];
  onChange: (selections: string[]) => void;
}

export default function MultiSelect<T>({
  id,
  testId,
  label,
  onChange,
  selectOptions,
  selectedOptions,
}: MultiSelectProps<T & IPrintable>) {
  const [selectedNames, setSelectedNames] = useState<string[]>(
    selectedOptions ?? []
  );

  const handleOnChange = (value: string) => {
    const newSelectedNames = selectedNames.includes(value)
      ? selectedNames.filter((name) => name !== value)
      : [...selectedNames, value];
    setSelectedNames(newSelectedNames);
    onChange(newSelectedNames);
  };

  return (
    <FormControl>
      <InputLabel id={id} sx={{ m: -1 }}>
        {label}
      </InputLabel>
      <Select
        data-testid={testId}
        labelId={id}
        multiple
        value={selectedNames}
        renderValue={(selected) => (
          <Stack gap={1} direction="row" flexWrap="wrap">
            {selected.map((value) => (
              <Chip
                key={value}
                label={value}
                onDelete={() =>
                  setSelectedNames(
                    selectedNames.filter((item) => item !== value)
                  )
                }
                deleteIcon={
                  <CancelIcon
                    sx={{ cursor: "pointer" }}
                    onMouseDown={(event) => event.stopPropagation()}
                  />
                }
              />
            ))}
          </Stack>
        )}
      >
        {selectOptions.map((entry) =>
          createSelectionList(entry, 0, handleOnChange)
        )}
      </Select>
    </FormControl>
  );
}

function createSelectionList<T>(
  entry: TreeNode<T & IPrintable>,
  nestLevel: number,
  handleOnChange: (value: string) => void
) {
  const parent = entry.self;
  const children = entry.children;
  return (
    <Stack key={crypto.randomUUID()}>
      <ListSubheader sx={{ marginLeft: nestLevel }}>
        {parent.toString()}
      </ListSubheader>
      {children.sort().map((child) => {
        if (child.children.length === 0) {
          return (
            <MenuItem
              key={child.self.toString()}
              value={child.self.toString()}
              onClick={() => handleOnChange(child.self.toString())}
              sx={{ marginLeft: nestLevel }}
            >
              {child.self.toString()}
            </MenuItem>
          );
        } else {
          return createSelectionList(child, nestLevel + 1, handleOnChange);
        }
      })}
    </Stack>
  );
}
