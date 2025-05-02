import React, { useState } from "react";
import "../../styles/Components/_subtask.scss";

interface AttachmentProps {
  taskId: string;
}

const Attachment: React.FC<AttachmentProps> = ({ taskId }) => {
  const [selectedFiles, setSelectedFiles] = useState<{ [key: string]: File | null }>({});

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFiles(prev => ({
        ...prev,
        [taskId]: e.target.files![0],
      }));
    }
  };

  const renderPreview = () => {
    const file = selectedFiles[taskId];
    if (file && file.type.startsWith("image")) {
      const objectURL = URL.createObjectURL(file);
      return <img className="upload-img" src={objectURL} alt="preview" width="450" height="250" />;
    }
    return null;
  };

  return (
    <div>
      {renderPreview()}
      <div className="Attachment">
        <div className="Upload-box">
          <input
            type="file"
            accept="image/*"
            className="Upload-input"
            onChange={handleFileChange}
          />
          <label className="Upload-label">
            Click to add / drop your files here
          </label>
        </div>
      </div>
    </div>
  );
};

export default Attachment;
