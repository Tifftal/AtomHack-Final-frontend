import { MantineProvider, createTheme } from "@mantine/core";
import { ChatBlock } from "../../features/chat/ChatContent/ChatBlock";
import { ChatFooter } from "../../features/chat/ChatFooter/ChatFooter";
import { ChatNav } from "../../features/chat/ChatNav/ChatNav";
import styles from "./Chat.module.scss";
import { useChat } from "./hooks/useChat";
import { grapeTheme, greenTheme, indigoTheme, orangeTheme, redTheme } from "../../app/ThemeProvider";
import { Dialog } from '@mantine/core';
import { IChatProps } from "./types";

export const Chat = (props: IChatProps) => {
  const { footerProps, chatBlockProps, navProps } = useChat(props);
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
        className={styles.chatdialog}
        classNames={{ root: styles.root }}
        position={{ bottom: "2.5vh", right: "2.5vw" }}
      >
        <div className={styles.page}>
          <ChatNav {...navProps} />
          <ChatBlock {...chatBlockProps } />
          <ChatFooter {...footerProps} />
        </div>
      </Dialog>
    </MantineProvider>

  );
};
