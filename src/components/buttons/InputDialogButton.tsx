import {
  IconButton,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
  IconButtonProps,
} from "@mui/material";
import { ChangeEvent, ReactNode, useState } from "react";
import { ActionDialogProps } from "../dialogs/ActionDialog";
import BaseDialog from "../dialogs/BaseDialog";

export interface InputDialogButtonProps
  extends IconButtonProps,
    Omit<ActionDialogProps, "open" | "onCancel" | "onOk"> {
  value?: string;
  label: string;
  onOk: (text: string) => void;
  icon: ReactNode;
}

export default function InputDialogButton({
  value,
  label,
  onOk,
  icon,
  titleText,
  contentText,
  cancelButton,
  okButton,
  ...props
}: InputDialogButtonProps) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value ?? "");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setInputValue(event.target.value);

  const handleOnClick = () => {
    handleClose();
    onOk(inputValue);
  };
  return (
    <>
      <IconButton onClick={handleClickOpen} {...props}>
        {icon}
      </IconButton>
      <BaseDialog
        open={open}
        onCancel={handleClose}
        borderColor={props.borderColor}
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
          <Button color={cancelButton.color} onClick={handleClose}>
            {cancelButton.label}
          </Button>
          <Button color={okButton.color} onClick={handleOnClick}>
            {okButton.label}
          </Button>
        </DialogActions>
      </BaseDialog>
    </>
  );
}
