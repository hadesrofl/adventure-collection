"use client";
import { DialogButtonProps } from "@components/dialogs/ActionDialog";
import YesNoDialog from "@components/dialogs/YesNoDialog";
import { useTheme } from "@mui/material";
import { useContext, useState } from "react";
import { DictionaryContext } from "@dictionaries/helpers/dictionaryContext";
import AddSystemDialog from "../AddSystemDialog/AddSystemDialog";

export default function NoSystemsDialog() {
  const [open, setOpen] = useState(true);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const theme = useTheme();
  const dictionary = useContext(DictionaryContext);
  const titleText = dictionary.NoSystemsDialog.title;
  const contentText = dictionary.NoSystemsDialog.contextText;
  const noButton: DialogButtonProps = {
    label: dictionary.NoSystemsDialog.buttons.no,
    color: "error",
  };

  const yesButton: DialogButtonProps = {
    label: dictionary.NoSystemsDialog.buttons.yes,
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
      <AddSystemDialog open={addDialogOpen} onClose={closeAddDialog} />
    </>
  );
}
