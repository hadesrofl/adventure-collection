"use client";
import { IconButton, IconButtonProps } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import AddSystemDialog from "../dialog/AddSystemDialog/AddSystemDialog";

// TODO: Can this component be even further reduced and be made reusable; also used in AddSeriesDialogButton
export interface AddSystemDialogButtonProps extends IconButtonProps {
  value?: string;
}

export default function AddSystemDialogButton({
  ...props
}: AddSystemDialogButtonProps) {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton color="success" onClick={handleClickOpen} {...props}>
        <AddIcon />
      </IconButton>
      <AddSystemDialog open={open} onClose={handleClose} />
    </>
  );
}
