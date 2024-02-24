"use client";
import { Box, Dialog } from "@mui/material";
import { ReactNode } from "react";

export interface BaseDialogProps {
  open: boolean;
  onCancel: () => void;
  borderColor?: string;
  children?: ReactNode;
}

export default function BaseDialog({
  open,
  onCancel,
  borderColor,
  children,
}: BaseDialogProps) {
  const borderSx =
    borderColor !== undefined
      ? { borderLeft: "solid 0.5rem", borderColor }
      : {};
  return (
    <Dialog
      color="primary"
      open={open}
      onClose={onCancel}
      aria-labelledby="action-dialog-title"
      aria-describedby="action-dialog-description"
    >
      <Box sx={borderSx}>{children}</Box>
    </Dialog>
  );
}
