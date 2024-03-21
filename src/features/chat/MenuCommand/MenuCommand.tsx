import styles from "./MenuCommand.module.scss";
import { ICommand } from "../../../utils/types";
import { clsx as cx } from "clsx";

export const MenuCommand: React.FC<ICommand> = (props) => {
  const { disabled, action, label } = props;
  return (
    <button
      className={cx(styles["menu-command-btn"])}
      onClick={action}
      disabled={disabled}
    >
      {label}
    </button>
  );
};
