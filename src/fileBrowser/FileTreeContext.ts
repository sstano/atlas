import React from "react";
import DirectoryItem from "../types/DirectoryItem";
import File from "../types/File";

export type FileTreeContextType = {
  fileMap: Record<string, DirectoryItem> | null;
  loadingError: Record<string, any> | string | null; // eslint-disable-line @typescript-eslint/no-explicit-any
  isLoadingInitialData: boolean;
  onFileOpened: (fileId: string) => any; // eslint-disable-line @typescript-eslint/no-explicit-any
  onFolderOpened: (folderId: string) => any; // eslint-disable-line @typescript-eslint/no-explicit-any
  onClosePreview: () => void;
  previewedFile: File | null;
};

export default React.createContext({
  fileMap: null,
  loadingError: null,
  isLoadingInitialData: false,
  onFileOpened: () => null,
  onFolderOpened: () => null,
  onClosePreview: () => null,
  previewedFile: null,
} as FileTreeContextType);
