import styles from "./ChatNav.module.scss";
import { IconBuildingCommunity, IconX, IconArrowsMaximize, IconArrowsMinimize } from "@tabler/icons-react";
import { ActionIcon, Group, Box, Select } from "@mantine/core";
import { FC } from "react";
import { ChatNavProps } from "./ChatNav.types";
import { ColonyEnum, IOption } from "../../../utils/types";
import { useTranslation } from "react-i18next";

export const ChatNav: FC<ChatNavProps> = (props) => {
  const { t } = useTranslation();
  const { colonies, colony, handleSetColony, toggleReport, setScreen, isFull } = props;

  return (
    <Box bg={colony ? colony.value : 'Crystallia'} className={styles.root}>
      <Select
        leftSectionPointerEvents="none"
        leftSection={
          <ActionIcon variant="transparent">
            <IconBuildingCommunity />
          </ActionIcon>}
        className={styles.select}
        placeholder={t("chat.colony")}
        value={colony ? colony.value : null}
        onChange={(_value, option) => {
          handleSetColony(option as IOption<ColonyEnum>);
          console.log(option)
        }}
        data={colonies}
      />

      <Group>
        <ActionIcon
          variant="subtle"
          aria-label="Settings"
          onClick={() => setScreen()}
          color="grape.9"
        >
          {
            isFull ? <IconArrowsMinimize size={"18"} /> : <IconArrowsMaximize size={"18"} />
          }
        </ActionIcon>
        <ActionIcon
          variant="subtle"
          aria-label="Settings"
          onClick={() => toggleReport(false)}
          color="grape.9"
        >
          <IconX style={{ width: '80%', height: '80%' }} stroke={2} />
        </ActionIcon>
      </Group>
    </div>
    </Box>
  );
};
