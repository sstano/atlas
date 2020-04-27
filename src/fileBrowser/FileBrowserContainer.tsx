import React, { useState, useEffect } from "react";
import FileBrowser from "./FileBrowser";

import apiHelper from "../api";
import DirectoryItem from "../types/DirectoryItem";

const onFileOpened = (fileId: string): void => {
  // TODO
};

const onFolderOpened = (folderId: string): void => {
  // TODO
};

const FileBrowserContainer: React.FC = () => {
  const [fileTree, setFileTree] = useState<DirectoryItem[]>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [loadingError, setLoadingError] = useState();

  useEffect(() => {
    async function loadInitialData() {
      try {
        setLoading(true);
        const folderContent = await apiHelper.getFolderContent();
        setFileTree(folderContent);
      } catch (error) {
        console.error(error);
        setLoadingError(error);
        setFileTree([]);
      } finally {
        setLoading(false);
      }
    }

    if (!fileTree && !isLoading) {
      loadInitialData();
    }
  }, [fileTree, isLoading]);

  return (
    <FileBrowser
      isLoadingRoot={isLoading}
      onFileOpened={onFileOpened}
      onFolderOpened={onFolderOpened}
      tree={fileTree}
    />
  );
};

export default FileBrowserContainer;
