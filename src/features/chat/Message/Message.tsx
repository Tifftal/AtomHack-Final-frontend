import { FC } from "react";
import styles from "./Message.module.scss";
import { IMessage } from "../../../utils/types";
import { clsx as cx } from "clsx";
import { MenuCommand } from "../MenuCommand/MenuCommand";
import { Box } from "@mantine/core";
// import { theme } from "../../../app/ThemeProvider";

export const Message: FC<IMessage> = (props) => {
  const { content, isUserMessage, colony, isHref } = props;
  if (Array.isArray(content))
    return (
      <Box>
        <div className={styles.root}>
          <div
            className={cx(
              styles.message,
              {
                [styles.user]: isUserMessage,
                // [styles.colonyAquarium]: colony?.value == ColonyEnum.Aquarium,
                // [styles.colonyGreenLabyrinth]: colony?.value === ColonyEnum.GreenLabyrinth,
                // [styles.colonyCrystallia]: colony?.value === ColonyEnum.Crystallia,
                // [styles.colonyDesertVortex]: colony?.value === ColonyEnum.DesertVortex,
                // [styles.colonyTerramorf]: colony?.value === ColonyEnum.Terramorf,
              },
              styles.commands
            )}
          >
            {content.map((command) => (
              <MenuCommand {...command} />
            ))}
          </div>
        </div>
      </Box>
    );

  return (
    <Box c={"white"} bg={colony ? colony.value : "Crystallia"}>
      <div className={styles.root}>
        <div
          className={cx(styles.message, {
            [styles.user]: isUserMessage,
            // [styles.colonyAquarium]: colony?.value,
            // [styles.GreenLabyrinth]: colony?.value,
            // [styles.Crystallia]: colony?.value,
            // [styles.DesertVortex]: colony?.value,
            // [styles.Terramorf]: colony?.value,
          })}
        >
          {isHref ? <a href={content}>Ссылка</a> : content}
        </div>
      </div>
    </Box>
  );
};
