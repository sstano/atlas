import DirectoryItem, { DirectoryItemType } from "../../types/DirectoryItem";

const convertContentArrayToMap = (contentArr: DirectoryItem[]) =>
  contentArr.reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
  }, {} as Record<string, DirectoryItem>);

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
