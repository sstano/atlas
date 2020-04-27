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
  node: DirectoryItem,
  onFileClicked: (fileId: string) => void,
  onFolderClicked: (folderId: string) => void
) => {
  const { id, type, name, content } = node;

  return type === DirectoryItemType.FILE ? (
    <Menu.Item key={id}>{name}</Menu.Item>
  ) : (
    <Menu.SubMenu
      key={id}
      title={name}
      onTitleClick={createItemClickHandler(id, onFolderClicked)}
    >
      {(content || []).map(
        renderTreeNode.bind(null, node, onFileClicked, onFolderClicked)
      )}
    </Menu.SubMenu>
  );
};

const renderTree = (
  onFileOpened: (fileId: string) => void,
  onFolderOpened: (folderId: string) => void,
  tree: Array<DirectoryItem>
) => (
  <div className={styles.fileTree}>
    <Menu onSelect={({ key }) => onFileOpened(key)}>
      {tree.map((node) => renderTreeNode(node, onFileOpened, onFolderOpened))}
    </Menu>
  </div>
);

const renderContent = (props: DirectoryTreeProps) => {
  if (props.isLoading) return renderLoadingSpinner();
  if (!props.tree) return renderNoData();
  return renderTree(props.onFileOpened, props.onFolderOpened, props.tree);
};

export type DirectoryTreeProps = {
  isLoading: boolean;
  onFileOpened: (id: string) => void;
  onFolderOpened: (id: string) => void;
  className?: string;
  tree?: Array<DirectoryItem>;
};

const DirectoryTree: React.FC<DirectoryTreeProps> = (props) => {
  const { className } = props;
  return <div className={className || ""}>{renderContent(props)}</div>;
};

export default DirectoryTree;
