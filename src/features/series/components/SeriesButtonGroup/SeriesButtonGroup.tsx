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
import { Series } from "../../types/series";

interface SeriesButtonGroupProps {
  series: Series;
}

export default function SeriesButtonGroup({ series }: SeriesButtonGroupProps) {
  const router = useRouter();
  const dictionary = useContext(DictionaryContext);
  const theme = useTheme();
  const deleteButtonProps: Omit<DeleteDialogButtonProps, "icon" | "onClick"> = {
    titleText: dictionary.SeriesButtonGroup.deleteDialog.title,
    contentText: `${dictionary.SeriesButtonGroup.deleteDialog.contextText} ${series.name}`,
    cancelButton: {
      label: dictionary.SeriesButtonGroup.deleteDialog.buttons.cancelLabel,
      color: "secondary",
    },
    okButton: {
      label: dictionary.SeriesButtonGroup.deleteDialog.buttons.okLabel,
      color: "error",
    },
  };

  const inputButtonProps: Omit<InputDialogButtonProps, "icon" | "onOk"> = {
    titleText: dictionary.SeriesButtonGroup.editDialog.title,
    contentText: `${dictionary.SeriesButtonGroup.editDialog.contextText} ${series.name}`,
    cancelButton: {
      label: dictionary.SeriesButtonGroup.editDialog.buttons.cancelLabel,
      color: "secondary",
    },
    okButton: {
      label: dictionary.SeriesButtonGroup.editDialog.buttons.okLabel,
      color: "success",
    },
    label: dictionary.SeriesButtonGroup.editDialog.label,
  };

  const deleteSeries = async () => {
    if ("id" in series) {
      try {
        await fetch(ApiRoutes.series.deleteSeries(series.id), {
          method: "DELETE",
        });
        router.refresh();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const editSeries = async (text: string) => {
    series.name = text;
    try {
      await fetch(ApiRoutes.series.editSeries(series.id), {
        body: JSON.stringify(series),
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
      data-testid={TestIds.seriesButtonGroup.root(series.name)}
    >
      <InputDialogButton
        data-testid={TestIds.seriesButtonGroup.inputDialogButton(series.name)}
        color="warning"
        borderColor={theme.palette.warning.main}
        value={series.name}
        label={inputButtonProps.label}
        onOk={editSeries}
        icon={<Edit />}
        titleText={inputButtonProps.titleText}
        contentText={inputButtonProps.contentText}
        cancelButton={inputButtonProps.cancelButton}
        okButton={inputButtonProps.okButton}
      />
      <DeleteDialogButton
        data-testid={TestIds.seriesButtonGroup.deleteDialogButton(series.name)}
        color="error"
        onClick={deleteSeries}
        icon={<Delete />}
        titleText={deleteButtonProps.titleText}
        contentText={deleteButtonProps.contentText}
        cancelButton={deleteButtonProps.cancelButton}
        okButton={deleteButtonProps.okButton}
      />
    </Stack>
  );
}
