"use client";
import CenteredBox from "@components/CenteredBox";
import { Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { DictionaryContext } from "@dictionaries/helpers/dictionaryContext";

export default function ErrorPage({
  error,
}: {
  error: Error & { digest?: string };
}) {
  const router = useRouter();
  const dictionary = useContext(DictionaryContext);

  const reload = () => {
    router.refresh();
  };

  const backToDashboard = () => {
    router.replace(window.location.origin);
  };

  return (
    <CenteredBox width="1/2">
      <Stack spacing={2} className="items-center">
        <Typography variant="h2">
          {dictionary.Errors.pages.generic.text}
        </Typography>
        <Typography variant="body1">{error.message}</Typography>
        <Typography variant="subtitle1">Digest: {error.digest}</Typography>
        <Button
          variant="contained"
          color="primary"
          className="w-1/2"
          onClick={reload}
        >
          {dictionary.Errors.pages.generic.buttons.tryAgain}
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className="w-1/2"
          onClick={backToDashboard}
        >
          {dictionary.Errors.pages.generic.buttons.backToHome}
        </Button>
      </Stack>
    </CenteredBox>
  );
}
