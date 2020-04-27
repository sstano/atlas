import DirectoryItem, { DirectoryItemType } from "../../types/DirectoryItem";
import convertContentArrayToMap from "./convertContentArrayToMap";

export default (
  rootFolderContent: DirectoryItem[]
): Record<string, DirectoryItem> => ({
  root: {
    id: "root",
    name: "",
    type: DirectoryItemType.FOLDER,
    childrenIDs: rootFolderContent.map((item) => item.id),
  },
  ...convertContentArrayToMap(rootFolderContent),
});
