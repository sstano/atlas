import React from "react";
import { Button, Tooltip } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import File from "../../../types/File";

import styles from "./FilePreview.module.css";

type FilePreviewProps = {
  className?: string;
  file: File | null;
  onClosePreview: () => void; // eslint-disable-line @typescript-eslint/no-explicit-any
};

const FilePreview: React.FC<FilePreviewProps> = ({
  className,
  file,
  onClosePreview,
}) => {
  const renderCloseButton = () => (
    <div className={styles.closeBtnWrapper}>
      <Tooltip title="Close">
        <Button onClick={onClosePreview} icon={<CloseOutlined />} />
      </Tooltip>
    </div>
  );

  return (
    <div className={className}>
      {file && renderCloseButton()}
      <p className={styles.filePreview}>
        {file ? file.text : "No file selected"}
      </p>
    </div>
  );
};

export default FilePreview;
