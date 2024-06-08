import { AdventureContext } from "../../../stores/AdventureContext";
import { TreeNode } from "../../../utils/TreeNode";
import { createGenreSubtree } from "../../../utils/getSubgenres";
import PrintableGenre from "../../../utils/printableGenre";
import { Genre } from "@prisma/client";
import { TestIds } from "@tests/testIds";
import { useContext } from "react";
import MultiSelect from "./MultiSelect";

interface GenreSelectionProps {
  genreOptions: Genre[];
}

export default function GenreSelection({ genreOptions }: GenreSelectionProps) {
  const { adventure, setAdventure } = useContext(AdventureContext);
  const genres: TreeNode<PrintableGenre>[] = genreOptions
    .filter((genre) => genre.parentId === null)
    .map((genre) => createGenreSubtree(genre, genreOptions));

  const handleGenreChange = (selections: string[]) => {
    const genres = genreOptions.filter((genre) =>
      selections.includes(genre.name)
    );
    setAdventure({ ...adventure, genres });
  };

  return (
    <MultiSelect
      testId={TestIds.adventureForm.fields.genres}
      label="Genres"
      selectOptions={genres}
      selectedOptions={adventure.genres.map((genre) => genre.name)}
      onChange={handleGenreChange}
    />
  );
}
