import { MantineProvider, createTheme } from "@mantine/core";
import { ChatBlock } from "../../features/chat/ChatContent/ChatBlock";
import { ChatFooter } from "../../features/chat/ChatFooter/ChatFooter";
import { ChatNav } from "../../features/chat/ChatNav/ChatNav";
import styles from "./Chat.module.scss";
import { useChat } from "./hooks/useChat";
import { grapeTheme, greenTheme, indigoTheme, orangeTheme, redTheme } from "../../app/ThemeProvider";
import { Dialog } from '@mantine/core';
import { IChatProps } from "./types";
import clsx from 'clsx';
import { useState } from "react";

export const Chat = (props: IChatProps) => {
  const { footerProps, chatBlockProps, navProps } = useChat(props);
  const [isFullscreen, setFullscreen] = useState(false)
  const [isDefaultscreen, setDefaultscreen] = useState(true)
  const chatDialogClsx = clsx(styles.chatdialog, {
    [styles['chatdialog__is-fullscreen']]: isFullscreen,
    [styles['chatdialog__is-defaultscreen']]: isDefaultscreen,
  })

  const handleSetScreen = () => {
    setFullscreen(state => !state);
    setDefaultscreen(state => !state);
  }


  return (
    <MantineProvider theme={createTheme({
      primaryColor: navProps.colony ? navProps.colony.value : 'Crystallia',
      colors: {
        'GreenLabyrinth': greenTheme,
        'Crystallia': grapeTheme,
        'DesertVortex': orangeTheme,
        'Aquarium': indigoTheme,
        'Terramorf': redTheme,
      }
    })}>
      <Dialog
        opened={true}
        className={chatDialogClsx}
        classNames={{ root: styles.root }}
        position={{ bottom: "2.5vh", right: "2.5vw" }}
      >
        <div className={styles.page}>
          <ChatNav {...navProps} setScreen={handleSetScreen} isFull={isFullscreen} />
          <ChatBlock {...chatBlockProps} />
          <ChatFooter {...footerProps} />
        </div>
      </Dialog>
    </MantineProvider>

  );
};
