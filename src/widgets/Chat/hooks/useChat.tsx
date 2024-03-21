import { useCallback, useState } from "react";
import { IChatBlockProps } from "../../../features/chat/ChatContent/ChatBlock.types";
import { IChatFooterProps } from "../../../features/chat/ChatFooter/ChatFooter.types";
import { ICommand, IMessage } from "../../../utils/types";
import { useFiles } from "./useFiles";
import { useColony } from "./useColony";
import { IChatNavProps } from "../../../features/chat/ChatNav/ChatNav.types";

/* const MESSAGES: IMessage[] = [
  { content: "svvffv", isUserMessage: true, time: "svfs" },
  { content: "svdvkldmflvdfvffv", isUserMessage: true, time: "svfs" },
  { content: "kmfvlkdmfvlkdfvlksdgblk", isUserMessage: true, time: "svfs" },
  { content: "svvffv", isUserMessage: false, time: "svfs" },
  { content: "svvffv", isUserMessage: true, time: "svfs" },
  { content: "svvffv", isUserMessage: true, time: "svfs" },
  { content: "svdvkldmflvdfvffv", isUserMessage: true, time: "svfs" },
  { content: "kmfvlkdmfvlkdfvlksdgblk", isUserMessage: true, time: "svfs" },
  { content: "svvffv", isUserMessage: false, time: "svfs" },
  { content: "svvffv", isUserMessage: true, time: "svfs" },
  { content: "svvffv", isUserMessage: true, time: "svfs" },
  { content: "svdvkldmflvdfvffv", isUserMessage: true, time: "svfs" },
  {
    content:
      "kmfvlkdmfvvlkdnv;df osijvdoifjv odifjbosdibgo;sfgb osifgjb ofijbgofsjb ofigjbb oifjbofijbilkdfvlksdgblk",
    isUserMessage: true,
    time: "svfs",
  },
  { content: "svvffv", isUserMessage: false, time: "svfs" },
  { content: "svvffv", isUserMessage: true, time: "svfs" },
  { content: "svvffv", isUserMessage: true, time: "svfs" },
  { content: "svdvkldmflvdfvffv", isUserMessage: true, time: "svfs" },
  { content: "kmfvlkdmfvlkdfvlksdgblk", isUserMessage: true, time: "svfs" },
  {
    content:
      "kmfvlkdmfvvlkdnv;df osijvdoifjv odifjbosdibgo;sfgb osifgjb ofijbgofsjb ofigjbb oifjbofijbilkdfvlksdgblk",
    isUserMessage: true,
    time: "svfs",
  },
  { content: "svvffv", isUserMessage: false, time: "svfs" },
  { content: "svvffv", isUserMessage: true, time: "svfs" },
  { content: "svvffv", isUserMessage: true, time: "svfs" },
  { content: "svdvkldmflvdfvffv", isUserMessage: true, time: "svfs" },
  { content: "kmfvlkdmfvlkdfvlksdgblk", isUserMessage: true, time: "svfs" },
  { content: "svvffv", isUserMessage: false, time: "svfs" },
  {
    content:
      "kmfvlkdmfvvlkdnv;df osijvdoifjv odifjbosdibgo;sfgb osifgjb ofijbgofsjb ofigjbb oifjbofijbilkdfvlksdgblk",
    isUserMessage: true,
    time: "svfs",
  },
  { content: "svvffv", isUserMessage: true, time: "svfs" },
]; */

export const useChat = () => {
  const [messages] = useState<IMessage[]>([]);
  const [additionalCommandMessage, setAdditionalCommandMessage] =
    useState<IMessage>();

  const { handleDeleteFile, handleUploadFiles, files, clearFiles } = useFiles();

  const { colony, handleSetColony, colonies } = useColony();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSendClick = useCallback(() => {
    clearFiles();
  }, [clearFiles]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const commandActionWrapper = useCallback(
    (action: () => void) => {
      if (additionalCommandMessage) {
        setAdditionalCommandMessage(undefined);
      }
      action();
    },
    [additionalCommandMessage]
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const setCommandMessage = useCallback((commands: ICommand[]) => {
    const addMessage: IMessage = {
      content: commands,
      time: "",
    };
    setAdditionalCommandMessage(addMessage);
  }, []);

  const commands: ICommand[] = [
    {
      label: "Начать",
      action: () => setCommandMessage([{ label: "stop", action: () => {} }]),
    },
    {
      label: "Закончить",
      action: () => {},
    },
    {
      label: "тык",
      action: () => {
        alert("ljnskjn");
      },
    },
    {
      label: "Много букв аааааа",
      action: () => {},
    },
    {
      label: "Много букв аааааа",
      action: () => {},
    },
  ];

  const navProps: IChatNavProps = {
    colonies,
    colony: colony,
    handleSetColony,
  };

  const chatBlockProps: IChatBlockProps = {
    messages: messages.concat(additionalCommandMessage || []),
  };

  const footerProps: IChatFooterProps = {
    commands: commands,
    filesData: {
      handleDeleteFile,
      handleUploadFiles,
      files,
    },
    disabled: !!additionalCommandMessage,
    sendHandler: handleSendClick,
    isBotChat: false, // todo
  };

  return { footerProps, chatBlockProps, navProps };
};
