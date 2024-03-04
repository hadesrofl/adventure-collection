import MultiSelect from "@components/lib/MultiSelect";
import { AdventureContext } from "@contexts/AdventureContext";
import { createGenreSubtree } from "@domain/getSubgenres";
import { TreeNode } from "@domain/models/helper/TreeNode";
import PrintableGenre from "@domain/models/helper/printableGenre";
import { Genre } from "@prisma/client";
import { TestIds } from "@tests/testIds";
import { useContext } from "react";

interface GenreSelectionProps {
  genreOptions: Genre[];
}

export default function GenreSelection({ genreOptions }: GenreSelectionProps) {
  const { adventure, setAdventure } = useContext(AdventureContext);
  let genres: TreeNode<PrintableGenre>[] = genreOptions
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
