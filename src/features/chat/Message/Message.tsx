import { FC } from "react";
import styles from "./Message.module.scss";
import { IMessage } from "../../../utils/types";
import { clsx as cx } from "clsx";
import { MenuCommand } from "../MenuCommand/MenuCommand";

export const Message: FC<IMessage> = (props) => {
  const { content, isUserMessage } = props;
  if (Array.isArray(content))
    return (
      <div className={styles.root}>
        <div
          className={cx(
            styles.message,
            {
              [styles.user]: isUserMessage,
            },
            styles.commands
          )}
        >
          {content.map((command) => (
            <MenuCommand {...command} />
          ))}
        </div>
      </div>
    );
  return (
    <div className={styles.root}>
      <div className={cx(styles.message, { [styles.user]: isUserMessage })}>
        {content}
      </div>
    </div>
  );
};
