import { Dispatch, SetStateAction } from "react";
import { ICommand, IFile } from "../../../utils/types";

export interface IChatFooterProps {
  commands: ICommand[];
  disabled?: boolean;
  isBotChat: boolean;
  setMessage: Dispatch<SetStateAction<string>>,
  filesData: {
    files: IFile[];
    handleDeleteFile: (id: number) => void;
    handleUploadFiles: (files: File[]) => void;
  };
  sendHandler: () => void;
}
