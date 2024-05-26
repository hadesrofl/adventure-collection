"use client";

import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  Stack,
} from "@mui/material";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Tag } from "@prisma/client";
import { useRouter } from "next/navigation";
import AppRoutes from "@routes/appRoutes";
import { DictionaryContext } from "@dictionaries/helpers/dictionaryContext";
import { AdventureFull } from "../../types/adventure";
import { buildAdventureSkeleton } from "../../types/factories/AdventureFactory";
import ApiRoutes from "@routes/apiRoutes";
import { Genre } from "@features/genres";
import { System } from "@features/systems";
import { createAdventureSchema } from "../../types/adventureSchema";
import { setJoiErrorMessages } from "@dictionaries/helpers/setJoiMessages";
import { TestIds } from "@tests/testIds";
import { AdventureProvider } from "../../stores/AdventureContext";
import SystemSelection from "./helper/SystemSelection";
import SeriesSelection from "./helper/SeriesSelection";
import LanguageSelection from "./helper/LanguageSelection";
import GenreSelection from "./helper/GenreSelection";
import TagSelection from "./helper/TagSelection";
import AdventureFormInput from "./helper/AdventureFormInput";
import { AdventureFormFields } from "./helper/AdventureFormFields";

export interface AdventureFormProps {
  tagOptions: Tag[];
  genreOptions: Genre[];
  systemOptions: System[];
  adventure?: AdventureFull;
}

export default function AdventureForm({
  tagOptions,
  genreOptions,
  systemOptions,
  adventure: initAdventure,
}: AdventureFormProps) {
  const [adventure, setAdventure] = useState<AdventureFull>(
    initAdventure ?? buildAdventureSkeleton()
  );
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [errors, setErrors] = useState<Map<string, string>>(new Map());
  const router = useRouter();
  const dictionary = useContext(DictionaryContext);
  const saveText = dictionary.AdventureForm.buttons.save;

  useEffect(() => {
    if (!isDirty) return;
    const validationResult = createAdventureSchema(dictionary).validate(
      adventure,
      setJoiErrorMessages(dictionary)
    );
    if (validationResult.error) {
      const errorSet: Map<string, string> = new Map();
      validationResult.error.details.forEach((errorDetail) => {
        const name = errorDetail.path[0];
        const message = errorDetail.message;
        errorSet.set(name.toString(), message);
      });
      setErrors(errorSet);
    } else setErrors(new Map());
  }, [adventure, dictionary, isDirty]);

  const handleSubmit = async () => {
    await fetch(
      adventure?.id
        ? ApiRoutes.adventures.editAdventure(adventure.id)
        : ApiRoutes.adventures.createAdventure(),
      {
        body: JSON.stringify({
          ...adventure,
          seriesId: adventure.seriesId === 0 ? null : adventure.seriesId,
        }),
        method: adventure?.id ? "PUT" : "POST",
      }
    );
    router.push(AppRoutes.adventureRoutes.collection);
    router.refresh();
  };

  const updateAdventure = (adventure: AdventureFull) => {
    if (!isDirty) setIsDirty(true);
    setAdventure(adventure);
  };

  const handleAlreadyPlayedChange = (
    _: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    updateAdventure({ ...adventure, alreadyPlayed: checked });
  };

  return (
    <AdventureProvider adventure={adventure} setAdventure={updateAdventure}>
      <Stack spacing={4} className="w-full">
        <AdventureFormInput errors={errors} field={AdventureFormFields.Title} />
        <AdventureFormInput
          errors={errors}
          field={AdventureFormFields.Summary}
        />
        <Grid container justifyContent="space-between" rowSpacing={3}>
          <Grid item xs={12} md={3}>
            <SystemSelection errors={errors} systemOptions={systemOptions} />
          </Grid>
          <Grid item xs={12} md={3}>
            <SeriesSelection errors={errors} />
          </Grid>
          <Grid item xs={12} md={3}>
            <LanguageSelection errors={errors} />
          </Grid>
        </Grid>
        <GenreSelection genreOptions={genreOptions} />
        <TagSelection tagOptions={tagOptions} />
        <FormControl>
          <Grid container rowSpacing={3}>
            <Grid item xs={12} md={4}>
              <AdventureFormInput
                errors={errors}
                field={AdventureFormFields.PageCount}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <AdventureFormInput
                errors={errors}
                field={AdventureFormFields.MinLevel}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <AdventureFormInput
                errors={errors}
                field={AdventureFormFields.MaxLevel}
              />
            </Grid>
          </Grid>
        </FormControl>
        <Grid container justifyContent="space-between">
          <Grid item xs={12} md={8}>
            <AdventureFormInput
              errors={errors}
              field={AdventureFormFields.Image}
            />
          </Grid>
          <Grid item xs={12} md={4} alignSelf="end" textAlign="center">
            <FormControlLabel
              data-testid={TestIds.adventureForm.fields.alreadyPlayed}
              control={
                <Checkbox
                  checked={adventure.alreadyPlayed}
                  onChange={handleAlreadyPlayedChange}
                />
              }
              label={dictionary.AdventureForm.labels.alreadyPlayed}
            />
          </Grid>
        </Grid>

        <Button
          data-testid={TestIds.adventureForm.fields.submit}
          color="success"
          variant="outlined"
          onClick={handleSubmit}
          disabled={errors.size > 0}
        >
          {saveText}
        </Button>
      </Stack>
    </AdventureProvider>
  );
}
