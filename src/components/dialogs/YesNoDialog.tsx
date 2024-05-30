"use client";

import ActionDialog, {
  ActionDialogProps,
  DialogButtonProps,
} from "./ActionDialog";

interface YesNoDialogProps
  extends Omit<
    ActionDialogProps,
    "cancelButton" | "okButton" | "onCancel" | "onOk"
  > {
  noButton: DialogButtonProps;
  onNo: () => void;
  yesButton: DialogButtonProps;
  onYes: () => void;
}

export default function YesNoDialog({
  titleText,
  contentText,
  borderColor,
  noButton,
  onNo,
  yesButton,
  onYes,
  open,
}: YesNoDialogProps) {
  const onCancel = () => onNo();
  const onOk = () => onYes();

  return (
    <ActionDialog
      titleText={titleText}
      contentText={contentText}
      borderColor={borderColor}
      cancelButton={noButton}
      okButton={yesButton}
      open={open}
      onCancel={onCancel}
      onOk={onOk}
    />
  );
}
