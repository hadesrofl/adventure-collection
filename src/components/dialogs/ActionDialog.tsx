import {
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  DialogTitle,
} from "@mui/material";
import BaseDialog, { BaseDialogProps } from "./BaseDialog";

type Color =
  | "inherit"
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "info"
  | "warning";

export interface DialogButtonProps {
  label: string;
  color: Color;
}

export interface ActionDialogProps extends BaseDialogProps {
  titleText: string;
  contentText: string;
  cancelButton: DialogButtonProps;
  okButton: DialogButtonProps;
  onOk: () => void;
}

export default function ActionDialog({
  titleText,
  contentText,
  borderColor,
  cancelButton,
  okButton,
  open,
  onCancel,
  onOk,
}: ActionDialogProps) {
  return (
    <BaseDialog
      open={open}
      onCancel={onCancel}
      borderColor={borderColor}
      aria-labelledby="action-dialog-title"
      aria-describedby="action-dialog-description"
    >
      <DialogTitle id="action-dialog-title">{titleText}</DialogTitle>
      <DialogContent>
        <DialogContentText
          id="action-dialog-description"
          whiteSpace="break-spaces"
        >
          {contentText}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color={cancelButton.color} onClick={onCancel}>
          {cancelButton.label}
        </Button>
        <Button color={okButton.color} onClick={onOk} autoFocus>
          {okButton.label}
        </Button>
      </DialogActions>
    </BaseDialog>
  );
}
