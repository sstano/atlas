import React from "react";
import File from "../../../types/File";

type FilePreviewProps = {
  className?: string;
  file: File | null;
};

const FilePreview: React.FC<FilePreviewProps> = ({ className, file }) => {
  return (
    <div className={className}>{file ? file.text : "No file selected"}</div>
  );
};

export default FilePreview;
