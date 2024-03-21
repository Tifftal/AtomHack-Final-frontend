import styles from "./ChatNav.module.scss";
import { IconBuildingCommunity, IconX } from "@tabler/icons-react";
import { ActionIcon, Select } from "@mantine/core";
import { FC } from "react";
import { IChatNavProps } from "./ChatNav.types";
import { ColonyEnum, IOption } from "../../../utils/types";

export const ChatNav: FC<IChatNavProps> = (props) => {
  const { colonies, colony, handleSetColony, toggleReport } = props;
  return (
    <div className={styles.root}>
      <Select
        leftSectionPointerEvents="none"
        leftSection={
          <ActionIcon variant="transparent">
            <IconBuildingCommunity />
          </ActionIcon>}
        className={styles.select}
        placeholder="Выберите колонию"
        value={colony ? colony.value : null}
        onChange={(_value, option) => {
          handleSetColony(option as IOption<ColonyEnum>);
        }}
        data={colonies}
      />
      <ActionIcon
        variant="subtle"
        aria-label="Settings"
        onClick={() => toggleReport(false)}
        color="grape.9"
      >
        <IconX style={{ width: '80%', height: '80%' }} stroke={2} />
      </ActionIcon>
    </div>
  );
};
