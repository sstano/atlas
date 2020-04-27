import DirectoryItem from "../../types/DirectoryItem";
import convertContentArrayToMap from "./convertContentArrayToMap";

export default (
  fileMap: Record<string, DirectoryItem>,
  folderId: string,
  folderContent: DirectoryItem[]
): Record<string, DirectoryItem> => ({
  ...fileMap,
  [folderId]: {
    ...fileMap[folderId],
    childrenIDs: folderContent.map(({ id }) => id),
  },
  ...convertContentArrayToMap(folderContent),
});
