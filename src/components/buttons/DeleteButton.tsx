"use client";

import Delete from "@mui/icons-material/Delete";
import { IconButton, IconButtonProps } from "@mui/material";
import { useRouter } from "next/navigation";

export interface DeleteButtonProps extends IconButtonProps {
  record: object;
  refreshPage?: boolean;
  onClick: ((value: object) => Promise<void>) | (() => void);
}

export default function DeleteButton({
  record,
  refreshPage,
  onClick,
  ...props
}: DeleteButtonProps) {
  const router = useRouter();
  const handleClick = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    await onClick(record);
    if (refreshPage) router.refresh();
  };
  return (
    <IconButton color="error" onClick={handleClick} {...props}>
      <Delete />
    </IconButton>
  );
}
