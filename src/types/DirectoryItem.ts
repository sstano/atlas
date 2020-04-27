export enum DirectoryItemType {
  FILE = "FILE",
  FOLDER = "FOLDER",
}

type DirectoryItem = {
  id: string;
  name: string;
  type: DirectoryItemType;
  content?: DirectoryItem[];
};

export default DirectoryItem; // eslint-disable-line no-undef
