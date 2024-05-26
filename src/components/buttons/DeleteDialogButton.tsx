import React, { ReactNode, useState } from "react";
import { IconButtonProps, IconButton, useTheme } from "@mui/material";
import ActionDialog, { ActionDialogProps } from "../dialogs/ActionDialog";

export interface DeleteDialogButtonProps
  extends IconButtonProps,
    Omit<ActionDialogProps, "open" | "onCancel" | "onOk"> {
  onClick: () => void;
  icon: ReactNode;
}

export default function DeleteDialogButton({
  onClick,
  icon,
  titleText,
  contentText,
  cancelButton,
  okButton,
  ...props
}: DeleteDialogButtonProps) {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOnClick = () => {
    handleClose();
    onClick();
  };

  return (
    <>
      <IconButton onClick={handleClickOpen} {...props}>
        {icon}
      </IconButton>
      <ActionDialog
        titleText={titleText}
        contentText={contentText}
        borderColor={theme.palette.error.main}
        cancelButton={cancelButton}
        okButton={okButton}
        open={open}
        onCancel={handleClose}
        onOk={handleOnClick}
      />
    </>
  );
}
