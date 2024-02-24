"use client";
import AppRoutes from "@app/appRoutes";
import { DialogButtonProps } from "@components/lib/dialogs/ActionDialog";
import YesNoDialog from "@components/lib/dialogs/YesNoDialog";
import { DictionaryContext } from "@dictionaries/helpers/dictionaryContext";
import { useTheme } from "@mui/material";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

export default function NoAdventureDialog() {
  const [open, setOpen] = useState(true);
  const router = useRouter();
  const theme = useTheme();
  const dictionary = useContext(DictionaryContext);
  const titleText = dictionary.AdventureCards.noAdventureDialog.title;
  const contentText = dictionary.AdventureCards.noAdventureDialog.contextText;
  const noButton: DialogButtonProps = {
    label: dictionary.AdventureCards.noAdventureDialog.buttons.no,
    color: "error",
  };
  const yesButton: DialogButtonProps = {
    label: dictionary.AdventureCards.noAdventureDialog.buttons.yes,
    color: "primary",
  };
  const onNo = () => {
    setOpen(false);
    router.refresh();
  };
  const onYes = () => {
    setOpen(false);
    router.push(AppRoutes.adventureRoutes.create);
  };

  return (
    <YesNoDialog
      titleText={titleText}
      borderColor={theme.palette.primary.main}
      contentText={contentText}
      noButton={noButton}
      onNo={onNo}
      yesButton={yesButton}
      onYes={onYes}
      open={open}
    />
  );
}
