import { Message } from "../Message/Message";
import styles from "./ChatBlock.module.scss";
import { IChatBlockProps } from "./ChatBlock.types";
import { clsx as cx } from "clsx";

export const ChatBlock = (props: IChatBlockProps) => {
  const { messages, colony } = props;
  return (
    <div className={styles.root}>
      <div className={styles.body}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={cx(styles["message-wrapper"], {
              [styles.user]: message.isUserMessage,
            })}
          >
            <Message {...message} colony={colony} />
          </div>
        ))}
      </div>
    </div>
  );
};
