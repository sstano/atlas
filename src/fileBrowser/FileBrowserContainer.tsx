import React, { useState, useEffect } from "react";

import apiHelper from "../api";

import FileTreeContext from "./FileTreeContext";
import FileBrowser from "./FileBrowser";
import DirectoryItem from "../types/DirectoryItem";
import initializeFileMap from "./utils/initializeFileMap";
import createNextFileMap from "./utils/createNextFileMap";
import File from "../types/File";

const FileBrowserContainer: React.FC = () => {
  const [fileMap, setFileMap] = useState<Record<string, DirectoryItem> | null>(
    null
  );
  const [isLoadingInitialData, setLoading] = useState<boolean>(false);
  const [loadingError, setLoadingError] = useState(null);
  const [openedFiles, setOpenedFiles] = useState<File[]>([]);

  const onFileOpened = async (fileId: string): Promise<void> => {
    try {
      const fileDetails = await apiHelper.getFileDetails(fileId);
      if (!fileDetails) {
        return;
      }

      const alreadyOpened = openedFiles.find(({ id }) => id === fileDetails.id);
      if (fileDetails && !alreadyOpened) {
        setOpenedFiles([...openedFiles, fileDetails]);
      }
    } catch (error) {
      console.error(error);
      setLoadingError(error);
    }
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

  const onClosePreview = (fileId: string): void => {
    const file = openedFiles.find(({ id }) => id === fileId);
    if (!file) {
      return;
    }
    const idx = openedFiles.indexOf(file);
    const nextState = [...openedFiles];
    nextState.splice(idx, 1);
    setOpenedFiles(nextState);
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
        openedFiles,
        onFileOpened,
        onFolderOpened,
        onClosePreview,
      }}
    >
      <FileBrowser />
    </FileTreeContext.Provider>
  );
};

export default FileBrowserContainer;
