"use client";
import { DialogButtonProps } from "../../../lib/dialogs/ActionDialog";
import YesNoDialog from "../../../lib/dialogs/YesNoDialog";
import { useTheme } from "@mui/material";
import { useContext, useState } from "react";
import { DictionaryContext } from "@dictionaries/helpers/dictionaryContext";
import AddSeriesDialog from "../AddSeriesDialog/AddSeriesDialog";
import { System } from "@domain/models/system";

interface NoSeriesDialogProps {
  systems: System[];
}

export default function NoSeriesDialog({ systems }: NoSeriesDialogProps) {
  const [open, setOpen] = useState(true);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const theme = useTheme();
  const dictionary = useContext(DictionaryContext);
  const titleText = dictionary.NoSeriesDialog.title;
  const contentText = dictionary.NoSeriesDialog.contextText;
  const noButton: DialogButtonProps = {
    label: dictionary.NoSeriesDialog.buttons.no,
    color: "error",
  };

  const yesButton: DialogButtonProps = {
    label: dictionary.NoSeriesDialog.buttons.yes,
    color: "primary",
  };

  const onNo = () => {
    setOpen(false);
  };

  const onYes = () => {
    setOpen(false);
    setAddDialogOpen(true);
  };

  const closeAddDialog = () => {
    setAddDialogOpen(false);
  };

  return (
    <>
      <YesNoDialog
        titleText={titleText}
        contentText={contentText}
        borderColor={theme.palette.primary.main}
        noButton={noButton}
        yesButton={yesButton}
        onNo={onNo}
        onYes={onYes}
        open={open}
      />
      <AddSeriesDialog
        open={addDialogOpen}
        onClose={closeAddDialog}
        systems={systems}
      />
    </>
  );
}
