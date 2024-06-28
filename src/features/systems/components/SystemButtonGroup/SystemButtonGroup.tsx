"use client";

import { Edit } from "@mui/icons-material";
import { Stack, useTheme } from "@mui/material";
import { useContext } from "react";
import ApiRoutes from "@routes/apiRoutes";
import DeleteDialogButton, {
  DeleteDialogButtonProps,
} from "@components/buttons/DeleteDialogButton";
import Delete from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation";
import InputDialogButton, {
  InputDialogButtonProps,
} from "@components/buttons/InputDialogButton";
import { DictionaryContext } from "@dictionaries/helpers/dictionaryContext";
import { TestIds } from "@tests/testIds";
import { System } from "../../types/system";

interface SystemButtonGroupProps {
  system: System;
}

export default function SystemButtonGroup({ system }: SystemButtonGroupProps) {
  const router = useRouter();
  const dictionary = useContext(DictionaryContext);
  const theme = useTheme();
  const deleteButtonProps: Omit<DeleteDialogButtonProps, "icon" | "onClick"> = {
    titleText: dictionary.SystemButtonGroup.deleteDialog.title,
    contentText: `${dictionary.SystemButtonGroup.deleteDialog.contextText} ${system.name}`,
    cancelButton: {
      label: dictionary.SystemButtonGroup.deleteDialog.buttons.cancelLabel,
      color: "secondary",
    },
    okButton: {
      label: dictionary.SystemButtonGroup.deleteDialog.buttons.okLabel,
      color: "error",
    },
  };

  const inputButtonProps: Omit<InputDialogButtonProps, "icon" | "onOk"> = {
    titleText: dictionary.SystemButtonGroup.editDialog.title,
    contentText: `${dictionary.SystemButtonGroup.editDialog.contextText} ${system.name}`,
    cancelButton: {
      label: dictionary.SystemButtonGroup.editDialog.buttons.cancelLabel,
      color: "secondary",
    },
    okButton: {
      label: dictionary.SystemButtonGroup.editDialog.buttons.okLabel,
      color: "success",
    },
    label: dictionary.SystemButtonGroup.editDialog.label,
  };

  const deleteSystem = async () => {
    if ("id" in system) {
      try {
        await fetch(ApiRoutes.systems.deleteSystem(system.id), {
          method: "DELETE",
        });
        router.refresh();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const editSystem = async (text: string) => {
    system.name = text;
    try {
      await fetch(ApiRoutes.systems.editSystem(system.id), {
        body: JSON.stringify(system),
        method: "PUT",
      });
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack
      direction="row"
      spacing={2}
      data-testid={TestIds.systemButtonGroup.root(system.name)}
    >
      <InputDialogButton
        data-testid={TestIds.systemButtonGroup.inputDialogButton(system.name)}
        color="warning"
        borderColor={theme.palette.warning.main}
        value={system.name}
        label={inputButtonProps.label}
        onOk={editSystem}
        icon={<Edit />}
        titleText={inputButtonProps.titleText}
        contentText={inputButtonProps.contentText}
        cancelButton={inputButtonProps.cancelButton}
        okButton={inputButtonProps.okButton}
      />
      <DeleteDialogButton
        data-testid={TestIds.systemButtonGroup.deleteDialogButton(system.name)}
        color="error"
        onClick={deleteSystem}
        icon={<Delete />}
        titleText={deleteButtonProps.titleText}
        contentText={deleteButtonProps.contentText}
        cancelButton={deleteButtonProps.cancelButton}
        okButton={deleteButtonProps.okButton}
      />
    </Stack>
  );
}
