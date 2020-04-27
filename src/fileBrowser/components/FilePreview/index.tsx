import React from "react";

type FilePreviewProps = {
  className?: string;
};

const FilePreview: React.FC<FilePreviewProps> = ({ className }) => {
  return <div className={className} />;
};

export default FilePreview;
