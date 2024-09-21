import LibraryBooks from "@mui/icons-material/LibraryBooks";
import BookSharp from "@mui/icons-material/BookSharp";
import DynamicFeed from "@mui/icons-material/DynamicFeed";
import AddAdventureButton from "./(dashboard)/AddAdventureButton";
import { Dictionary } from "@dictionaries/helpers/getDictionaries";

export default function getNavigationEntries(dictionary: Dictionary) {
  return [
    {
      segment: "adventures",
      title: dictionary.Navigation.adventures,
      icon: <LibraryBooks />,
      action: <AddAdventureButton />,
    },
    {
      segment: "series",
      title: dictionary.Navigation.series,
      icon: <DynamicFeed />,
    },
    {
      segment: "systems",
      title: dictionary.Navigation.systems,
      icon: <BookSharp />,
    },
  ];
}
