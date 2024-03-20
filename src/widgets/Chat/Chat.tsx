import { ChatBlock } from "../../features/chat/ChatContent/ChatBlock";
import { ChatFooter } from "../../features/chat/ChatFooter/ChatFooter";
import { ChatNav } from "../../features/chat/ChatNav/ChatNav";
import styles from "./Chat.module.scss";
import { useChat } from "./hooks/useChat";

export const Chat = () => {
  const { footerProps, chatBlockProps, navProps } = useChat();
  return (
    <div className={styles.page}>
      <ChatNav {...navProps} />
      <ChatBlock {...chatBlockProps} />
      <ChatFooter {...footerProps} />
    </div>
  );
};
