import React from "react";
import { Menu, Spin, Empty } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import DirectoryItem, { DirectoryItemType } from "../../../types/DirectoryItem";
import styles from "./DirectoryTree.module.css";

const renderLoadingSpinner = () => (
  <Spin size="large" indicator={<LoadingOutlined spin />} />
);

const renderNoData = () => <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;

const createItemClickHandler = (
  id: string,
  callback: (id: string) => void
) => () => callback(id);

const renderTreeNode = (
  files: Record<string, DirectoryItem>,
  node: DirectoryItem,
  onFileClicked: (fileId: string) => void,
  onFolderClicked: (folderId: string) => void
) => {
  const { id, type, name, childrenIDs } = node;

  return type === DirectoryItemType.FILE ? (
    <Menu.Item key={id}>{name}</Menu.Item>
  ) : (
    <Menu.SubMenu
      key={id}
      title={name}
      onTitleClick={createItemClickHandler(id, onFolderClicked)}
    >
      {(childrenIDs || []).map((childId) =>
        renderTreeNode(files, files[childId], onFileClicked, onFolderClicked)
      )}
    </Menu.SubMenu>
  );
};

const renderTree = (
  onFileOpened: (fileId: string) => void,
  onFolderOpened: (folderId: string) => void,
  files: Record<string, DirectoryItem>
) => (
  <div className={styles.fileTree}>
    <Menu onSelect={({ key }) => onFileOpened(key)}>
      {files.root?.childrenIDs?.map((id) =>
        renderTreeNode(files, files[id], onFileOpened, onFolderOpened)
      )}
    </Menu>
  </div>
);

const renderContent = (props: DirectoryTreeProps) => {
  if (props.isLoading) return renderLoadingSpinner();
  if (!props.files) return renderNoData();
  return renderTree(
    props.onFileOpened,
    props.onFolderOpened,
    props.files as Record<string, DirectoryItem>
  );
};

export type DirectoryTreeProps = {
  isLoading: boolean;
  onFileOpened: (id: string) => void;
  onFolderOpened: (id: string) => void;
  className?: string;
  files: Record<string, DirectoryItem> | null;
};

const DirectoryTree: React.FC<DirectoryTreeProps> = (props) => {
  const { className } = props;
  return <div className={className || ""}>{renderContent(props)}</div>;
};

export default DirectoryTree;
