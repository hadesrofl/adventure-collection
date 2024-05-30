import { Stack, Divider, IconButton } from "@mui/material";
import DeleteDialogButton from "@components/buttons/DeleteDialogButton";
import { Edit, Delete } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { DialogButtonProps } from "@components/dialogs/ActionDialog";
import { DictionaryContext } from "@dictionaries/helpers/dictionaryContext";
import { useContext } from "react";
import { AdventureCardCommonProps } from "./AdventureCardCommonProps";
import { deleteAdventureById } from "../../../repositories/deleteAdventures";
import Link from "next/link";
import AppRoutes from "@routes/appRoutes";

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
        await deleteAdventureById(adventure.id);
        router.push(AppRoutes.adventureRoutes.collection);
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
          <Link href={AppRoutes.adventureRoutes.edit(adventure.id)}>
            <IconButton color="secondary">
              <Edit />
            </IconButton>
          </Link>

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
