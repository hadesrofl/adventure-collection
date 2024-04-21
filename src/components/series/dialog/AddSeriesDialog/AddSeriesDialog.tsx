import ApiRoutes from "@app/api/apiRoutes";
import BaseDialog from "@components/lib/dialogs/BaseDialog";
import { DictionaryContext } from "@dictionaries/helpers/dictionaryContext";
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  Select,
  MenuItem,
  TextField,
  DialogActions,
  Button,
  SelectChangeEvent,
  useTheme,
} from "@mui/material";
import { System, Series } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useContext, useState, ChangeEvent } from "react";

export interface AddSeriesDialogProps {
  open: boolean;
  systems: System[];
  value?: string;
  onClose: () => void;
}

export default function AddSeriesDialog({
  open,
  systems,
  value,
  onClose,
}: AddSeriesDialogProps) {
  const theme = useTheme();
  const router = useRouter();
  const dictionary = useContext(DictionaryContext);
  const [inputValue, setInputValue] = useState(value ?? "");
  const [selectedSystem, setSelectedSystem] = useState<System | undefined>(
    undefined
  );

  const label = dictionary.AddSeriesDialogButton.labels.series;
  const titleText = dictionary.AddSeriesDialogButton.titleText;
  const contentText = dictionary.AddSeriesDialogButton.contentText;
  const cancelButton = dictionary.AddSeriesDialogButton.cancelButton;
  const okButton = dictionary.AddSeriesDialogButton.okButton;

  const handleSystemChange = (event: SelectChangeEvent) =>
    setSelectedSystem(
      systems.find(
        (system) => system.id === Number.parseInt(event.target.value)
      )
    );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setInputValue(event.target.value);

  const addSeries = async (text: string) => {
    if (selectedSystem === undefined)
      throw new Error("System has to be selected");
    const series: Series = {
      id: 0,
      name: text,
      createdAt: new Date(Date.now()),
      systemId: selectedSystem?.id,
    };
    try {
      await fetch(ApiRoutes.series.createSeries(), {
        body: JSON.stringify(series),
        method: "POST",
      });
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnClick = () => {
    addSeries(inputValue);
    onClose();
  };

  return (
    <BaseDialog
      open={open}
      onCancel={onClose}
      borderColor={theme.palette.success.main}
    >
      <DialogTitle>{titleText}</DialogTitle>
      <DialogContent>
        <DialogContentText>{contentText}</DialogContentText>
        <Select
          sx={{ marginTop: 2 }}
          value={selectedSystem?.id.toString()}
          variant="standard"
          displayEmpty
          onChange={handleSystemChange}
          fullWidth
          required
          renderValue={(selected) => {
            if (selected === "" || selected === undefined) {
              return (
                <em>{dictionary.AddSeriesDialogButton.systemPlaceholder}</em>
              );
            }

            const s = systems.find(
              (system) => system.id === Number.parseInt(selected)
            );

            return s?.name;
          }}
        >
          {systems.map((system) => {
            return (
              <MenuItem key={crypto.randomUUID()} value={system.id}>
                {system.name}
              </MenuItem>
            );
          })}
        </Select>
        <TextField
          autoFocus
          value={inputValue}
          onChange={handleChange}
          margin="dense"
          label={label}
          type="text"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={onClose}>
          {cancelButton}
        </Button>
        <Button
          color="success"
          onClick={handleOnClick}
          disabled={
            selectedSystem === undefined ||
            inputValue === "" ||
            inputValue === undefined
          }
        >
          {okButton}
        </Button>
      </DialogActions>
    </BaseDialog>
  );
}
