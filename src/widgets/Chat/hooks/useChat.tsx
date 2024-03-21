import { useCallback, useState } from "react";
import { IChatBlockProps } from "../../../features/chat/ChatContent/ChatBlock.types";
import { IChatFooterProps } from "../../../features/chat/ChatFooter/ChatFooter.types";
import { ICommand, IMessage } from "../../../utils/types";
import { useFiles } from "./useFiles";
import { useColony } from "./useColony";
import { IChatNavHookProps } from "../../../features/chat/ChatNav/ChatNav.types";
import { IChatProps } from "../types";

const MESSAGES: IMessage[] = [
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
];

export const useChat = (props: IChatProps) => {
  const { toggleReport } = props;
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [curMes, setCurMes] = useState('')
  const [additionalCommandMessage, setAdditionalCommandMessage] =
    useState<IMessage>();

  const addMessage = (message: IMessage) => {
    setAdditionalCommandMessage(undefined);
    setMessages((prev) => prev.concat(message));
  };
  const { handleDeleteFile, handleUploadFiles, files, clearFiles } = useFiles();

  const { colony, handleSetColony, colonies, isLoading, actions } = useColony(
    setAdditionalCommandMessage,
    addMessage,
    curMes
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSendClick = useCallback(() => {
    clearFiles();
  }, [clearFiles]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const commandActionWrapper = useCallback(
    (action?: () => void) => {
      if (additionalCommandMessage) {
        setAdditionalCommandMessage(undefined);
      }
      action ? action() : null;
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
      label: "Доступ",
      action: () =>
        commandActionWrapper(actions ? actions[0].action : () => {}),
      disabled: actions ? !actions[0].active : true,
    },
    {
      label: "Управление",
      action: () =>
        commandActionWrapper(actions ? actions[1].action : () => {}),
      disabled: actions ? !actions[1].active : true,
    },
    {
      label: "Сообщение чату",
      action: () =>
        commandActionWrapper(actions ? actions[2].action : () => {}),
      disabled: actions ? !actions[2].active : true,
    },
    {
      label: "Сообщение в поддержку",
      action: () =>
        commandActionWrapper(actions ? actions[3].action : () => {}),
      disabled: actions ? !actions[3].active : true,
    },
  ];

  const navProps: IChatNavHookProps = {
    colonies,
    colony: colony,
    handleSetColony,
    toggleReport,
  };

  const chatBlockProps: IChatBlockProps = {
    messages: messages.concat(additionalCommandMessage || []),
    colony: colony,
  };

  const footerProps: IChatFooterProps = {
    commands: commands,
    setMessage: setCurMes,
    filesData: {
      handleDeleteFile,
      handleUploadFiles,
      files,
    },
    disabled: !!additionalCommandMessage || isLoading,
    sendHandler: handleSendClick,
    isBotChat: false, // todo
  };

  return { footerProps, chatBlockProps, navProps };
};
