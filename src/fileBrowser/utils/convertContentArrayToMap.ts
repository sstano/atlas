import DirectoryItem from "../../types/DirectoryItem";

export default (contentArr: DirectoryItem[]) =>
  contentArr.reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
  }, {} as Record<string, DirectoryItem>);
