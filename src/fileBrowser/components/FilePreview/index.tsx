import React from "react";
import File from "../../../types/File";

import styles from "./FilePreview.module.css";

type FilePreviewProps = {
  className?: string;
  file: File;
};

const FilePreview: React.FC<FilePreviewProps> = ({ className, file }) => {
  return (
    <div className={className}>
      <p className={styles.filePreview}>{file.text}</p>
    </div>
  );
};

export default FilePreview;
