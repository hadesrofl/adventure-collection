import { Stack, Divider, IconButton } from "@mui/material";
import DeleteDialogButton from "@components/lib/buttons/DeleteDialogButton";
import { Edit, Delete } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { DialogButtonProps } from "@components/lib/dialogs/ActionDialog";
import { DictionaryContext } from "@dictionaries/helpers/dictionaryContext";
import { useContext } from "react";
import { AdventureCardCommonProps } from "./AdventureCardCommonProps";

export default function AdventureCardFooter({
  adventure,
}: AdventureCardCommonProps) {
  const router = useRouter();
  const dictionary = useContext(DictionaryContext);
  const titleText = dictionary.AdventureCards.deleteDialog.title;
  const contentText = `${dictionary.AdventureCards.deleteDialog.contextText} ${adventure.name}`;
  const cancelButton: DialogButtonProps = {
    label: dictionary.AdventureCards.deleteDialog.buttons.cancelLabel,
    color: "secondary",
  };
  const okButton: DialogButtonProps = {
    label: dictionary.AdventureCards.deleteDialog.buttons.okLabel,
    color: "error",
  };

  const deleteAdventure = async () => {
    if ("id" in adventure) {
      try {
        // TODO: Add here call to delete adventure
        router.refresh();
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <Stack spacing={2} width="100%">
        <Divider />
        <Stack direction="row-reverse">
          {/* TODO: Add here link to edit form */}
          <IconButton color="secondary">
            <Edit />
          </IconButton>

          <DeleteDialogButton
            color="error"
            onClick={deleteAdventure}
            icon={<Delete />}
            titleText={titleText}
            contentText={contentText}
            cancelButton={cancelButton}
            okButton={okButton}
          ></DeleteDialogButton>
        </Stack>
      </Stack>
    </>
  );
}
