import React from "react";
import DirectoryTree from "./components/DirectoryTree";
import FilePreview from "./components/FilePreview";
import styles from "./FileBrowser.module.css";
import DirectoryItem from "../types/DirectoryItem";

type FileBrowserProps = {
  isLoadingRoot: boolean;
  onFileOpened: (id: string) => void;
  onFolderOpened: (id: string) => void;
  tree?: Array<DirectoryItem>;
};

const FileBrowser: React.FC<FileBrowserProps> = ({
  isLoadingRoot,
  tree,
  onFileOpened,
  onFolderOpened,
}) => {
  return (
    <div className={styles.pageWrapper}>
      <h1 className={styles.title}>Directory Browser</h1>
      <div className={styles.browserView}>
        <DirectoryTree
          className={styles.directoryTreePanel}
          isLoading={isLoadingRoot}
          tree={tree}
          onFileOpened={onFileOpened}
          onFolderOpened={onFolderOpened}
        />
        <FilePreview className={styles.filePreviewPanel} />
      </div>
    </div>
  );
};

export default FileBrowser;
