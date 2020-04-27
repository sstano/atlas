import React from "react";
import DirectoryTree from "./components/DirectoryTree";
import FilePreview from "./components/FilePreview";
import styles from "./FileBrowser.module.css";

import FileTreeContext from "./FileTreeContext";

type FileBrowserProps = {};

const FileBrowser: React.FC<FileBrowserProps> = () => {
  return (
    <div className={styles.pageWrapper}>
      <h1 className={styles.title}>Directory Browser</h1>
      <div className={styles.browserView}>
        <FileTreeContext.Consumer>
          {({
            fileMap,
            isLoadingInitialData,
            onFolderOpened,
            onFileOpened,
            onClosePreview,
            previewedFile,
          }) => (
            <>
              <DirectoryTree
                className={styles.directoryTreePanel}
                isLoading={isLoadingInitialData}
                files={fileMap}
                onFileOpened={onFileOpened}
                onFolderOpened={onFolderOpened}
              />

              <FilePreview
                className={styles.filePreviewPanel}
                file={previewedFile}
                onClosePreview={onClosePreview}
              />
            </>
          )}
        </FileTreeContext.Consumer>
      </div>
    </div>
  );
};

export default FileBrowser;
