import React, { useState, useEffect } from "react";

import apiHelper from "../api";

import FileTreeContext from "./FileTreeContext";
import FileBrowser from "./FileBrowser";
import DirectoryItem from "../types/DirectoryItem";
import initializeFileMap from "./utils/initializeFileMap";
import createNextFileMap from "./utils/createNextFileMap";

const FileBrowserContainer: React.FC = () => {
  const [fileMap, setFileMap] = useState<Record<string, DirectoryItem> | null>(
    null
  );
  const [isLoadingInitialData, setLoading] = useState<boolean>(false);
  const [loadingError, setLoadingError] = useState(null);

  const onFileOpened = (fileId: string): void => {
    // TODO
  };

  const onFolderOpened = async (folderId: string): Promise<void> => {
    try {
      const folderContent = await apiHelper.getFolderContent(folderId);
      const nextFileMap = createNextFileMap(
        fileMap as Record<string, DirectoryItem>,
        folderId,
        folderContent
      );
      setFileMap(nextFileMap);
    } catch (error) {
      console.error(error);
      setLoadingError(error);
    }
  };

  useEffect(() => {
    async function loadInitialData() {
      try {
        setLoading(true);
        const rootFolderContent = await apiHelper.getFolderContent();
        setFileMap(initializeFileMap(rootFolderContent));
      } catch (error) {
        console.error(error);
        setLoadingError(error);
        setFileMap({});
      } finally {
        setLoading(false);
      }
    }

    if (!fileMap && !isLoadingInitialData) {
      loadInitialData();
    }
  }, [fileMap, isLoadingInitialData]);

  return (
    <FileTreeContext.Provider
      value={{
        fileMap,
        isLoadingInitialData,
        loadingError,
        onFileOpened,
        onFolderOpened,
      }}
    >
      <FileBrowser />
    </FileTreeContext.Provider>
  );
};

export default FileBrowserContainer;