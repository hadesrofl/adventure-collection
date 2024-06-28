import ApiRoutes from "@routes/apiRoutes";
import BaseDialog from "@components/dialogs/BaseDialog";
import { DictionaryContext } from "@dictionaries/helpers/dictionaryContext";
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
  useTheme,
} from "@mui/material";
import { System } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useContext, useState, ChangeEvent } from "react";

export interface AddSystemDialogProps {
  open: boolean;
  value?: string;
  onClose: () => void;
}

export default function AddSystemDialog({
  open,
  value,
  onClose,
}: AddSystemDialogProps) {
  const theme = useTheme();
  const router = useRouter();
  const dictionary = useContext(DictionaryContext);
  const [inputValue, setInputValue] = useState(value ?? "");

  const label = dictionary.AddSystemDialogButton.labels.system;
  const titleText = dictionary.AddSystemDialogButton.titleText;
  const contentText = dictionary.AddSystemDialogButton.contentText;
  const cancelButton = dictionary.AddSystemDialogButton.cancelButton;
  const okButton = dictionary.AddSystemDialogButton.okButton;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setInputValue(event.target.value);

  const addSystem = async (text: string) => {
    const system: System = {
      id: 0,
      name: text,
      createdAt: new Date(Date.now()),
    };
    try {
      await fetch(ApiRoutes.systems.createSystem(), {
        body: JSON.stringify(system),
        method: "POST",
      });
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnClick = () => {
    addSystem(inputValue);
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
          disabled={inputValue === "" || inputValue === undefined}
        >
          {okButton}
        </Button>
      </DialogActions>
    </BaseDialog>
  );
}
