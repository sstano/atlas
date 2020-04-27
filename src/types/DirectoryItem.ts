export enum DirectoryItemType {
  FILE = "FILE",
  FOLDER = "FOLDER",
}

type DirectoryItem = {
  id: string;
  name: string;
  type: DirectoryItemType;
  childrenIDs?: string[] | null;
};

export default DirectoryItem; // eslint-disable-line no-undef
