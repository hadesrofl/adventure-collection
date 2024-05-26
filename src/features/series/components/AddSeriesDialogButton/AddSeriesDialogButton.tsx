"use client";
import { IconButton, IconButtonProps } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { System } from "@features/systems";
import AddSeriesDialog from "../dialog/AddSeriesDialog/AddSeriesDialog";

export interface AddSeriesDialogButtonProps extends IconButtonProps {
  value?: string;
  systems: System[];
}

export default function AddSeriesDialogButton({
  value,
  systems,
  ...props
}: AddSeriesDialogButtonProps) {
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
      <AddSeriesDialog open={open} onClose={handleClose} systems={systems} />
    </>
  );
}
