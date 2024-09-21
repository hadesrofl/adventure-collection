"use client";

import { AddCircle } from "@mui/icons-material";
import { Button } from "@mui/material";
import AppRoutes from "@routes/appRoutes";
import { useRouter } from "next/navigation";

export default function AddAdventureButton() {
  const router = useRouter();
  return (
    <Button
      startIcon={<AddCircle />}
      color="success"
      onClick={(event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        router.push(AppRoutes.adventureRoutes.create);
      }}
    ></Button>
  );
}
