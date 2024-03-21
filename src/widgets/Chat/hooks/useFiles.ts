import { useCallback, useState } from "react";
import { IFile } from "../../../utils/types";

export const MAX_FILES_LENGTH = 5;

export const useFiles = () => {
  const [files, setFiles] = useState<IFile[]>([]);

  const handleDeleteFile = useCallback((fileId: number) => {
    setFiles((prevFiles) => [
      ...prevFiles.filter((file) => file.id !== fileId),
    ]);
  }, []);

  const clearFiles = useCallback(() => {
    setFiles([]);
  }, []);

  const handleUploadFiles = useCallback(
    (newFiles: File[]) => {
      if (newFiles.length > MAX_FILES_LENGTH) return;
      const lastId = files.pop()?.id || 0;
      const newFileObjects = newFiles.map((file, index) => ({
        file: file,
        id: index + lastId,
      }));
      setFiles(files.concat(newFileObjects));
    },
    [files]
  );

  return { handleUploadFiles, files, handleDeleteFile, clearFiles };
};
