import AutoCompleteWithLabels from "@components/lib/AutoCompleteWithLabels";
import { AdventureContext } from "@contexts/AdventureContext";
import { DictionaryContext } from "@dictionaries/helpers/dictionaryContext";
import { Tag } from "@prisma/client";
import { TestIds } from "@tests/testIds";
import { useContext } from "react";

interface TagSelectionProps {
  tagOptions: Tag[];
}

export default function TagSelection({ tagOptions }: TagSelectionProps) {
  const { adventure, setAdventure } = useContext(AdventureContext);
  const dictionary = useContext(DictionaryContext);

  const handleTagsChange = (changedTags: string[]) => {
    const newTags: Tag[] = [];
    changedTags.sort().forEach((tag) => {
      const foundTag = tagOptions.find((t) => t.name === tag);
      if (foundTag) newTags.push(foundTag);
      else
        newTags.push({
          id: 0,
          createdAt: new Date(Date.now()),
          name: tag,
        });
    });
    setAdventure({ ...adventure, tags: newTags });
  };

  return (
    <AutoCompleteWithLabels
      testId={TestIds.adventureForm.fields.tags}
      title={dictionary.AdventureForm.labels.tags}
      initSelection={adventure.tags.map((tag) => tag.name).sort()}
      options={tagOptions.map((tag) => tag.name).sort()}
      onChange={handleTagsChange}
    />
  );
}
