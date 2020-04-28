import React from "react";
import { Tabs } from "antd";
import DirectoryTree from "./components/DirectoryTree";
import FilePreview from "./components/FilePreview";
import styles from "./FileBrowser.module.css";

import FileTreeContext from "./FileTreeContext";

const { TabPane } = Tabs;

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
            openedFiles,
          }) => (
            <>
              <DirectoryTree
                className={styles.directoryTreePanel}
                isLoading={isLoadingInitialData}
                files={fileMap}
                onFileOpened={onFileOpened}
                onFolderOpened={onFolderOpened}
              />

              <div className={styles.filePreviewPanel}>
                {(!openedFiles || !openedFiles.length) && (
                  <p>No file selected</p>
                )}
                {Boolean(openedFiles && openedFiles.length) && (
                  <Tabs
                    type="editable-card"
                    hideAdd
                    onEdit={(fileId, action) => {
                      if (action === "remove") {
                        onClosePreview(String(fileId));
                      }
                    }}
                  >
                    {openedFiles.map((file) => (
                      <TabPane tab={file.name} key={file.id} closable>
                        <FilePreview file={file} />
                      </TabPane>
                    ))}
                  </Tabs>
                )}
              </div>
            </>
          )}
        </FileTreeContext.Consumer>
      </div>
    </div>
  );
};

export default FileBrowser;
