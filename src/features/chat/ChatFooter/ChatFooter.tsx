import { useState } from "react";
import styles from "./ChatFooter.module.scss";
import { clsx as cx } from "clsx";
import { ActionIcon, FileButton, Textarea } from "@mantine/core";
import { IconCategory, IconPaperclip, IconRocket } from "@tabler/icons-react";
import { MenuCommand } from "../MenuCommand/MenuCommand";
import { IChatFooterProps } from "./ChatFooter.types";
import File from "../../../enteties/File";
import { MAX_FILES_LENGTH } from "../../../widgets/Chat/hooks/useFiles";

export const ChatFooter = (props: IChatFooterProps) => {
  const { commands, disabled, filesData, sendHandler, isBotChat } = props;
  const { handleUploadFiles, files, handleDeleteFile } = filesData;

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className={styles.root}>
      <div
        className={cx(styles.files, { [styles["files-open"]]: files.length })}
      >
        {files.map((fileData, index) => (
          <File
            deleteHandler={handleDeleteFile}
            id={fileData.id}
            key={index}
            name={fileData.file.name}
            type={fileData.file.type}
          />
        ))}
      </div>
      <div className={styles["manage-block"]}>
        <div className={styles["input-bar"]}>
          <div>
            <FileButton
              disabled={
                disabled || files.length > MAX_FILES_LENGTH || isBotChat
              }
              onChange={handleUploadFiles}
              multiple
            >
              {(props) => (
                <ActionIcon
                  {...props}
                  variant="transparent"
                  disabled={
                    disabled || files.length >= MAX_FILES_LENGTH || isBotChat
                  }
                >
                  <IconPaperclip />
                </ActionIcon>
              )}
            </FileButton>
          </div>

          <Textarea
            placeholder="Введите сообщение"
            autosize
            disabled={disabled}
            minRows={1}
            maxRows={4}
            className={styles["input-area"]}
          />
          <div>
            <ActionIcon
              disabled={disabled}
              variant="transparent"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              /* color={isMenuOpen ? "gray" : ""} */
            >
              <IconCategory />
            </ActionIcon>
          </div>
          <div>
            <ActionIcon
              variant="transparent"
              disabled={disabled}
              onClick={sendHandler}
            >
              <IconRocket />
            </ActionIcon>
          </div>
        </div>
        <div
          className={cx(styles.menu, {
            [styles.open]: isMenuOpen,
            [styles.more]: commands.length > 4,
            [styles.odd]: commands.length % 2,
          })}
        >
          {commands.map((command, index) => (
            <MenuCommand {...command} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};
