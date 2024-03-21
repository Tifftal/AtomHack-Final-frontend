import { SetStateAction } from "react";
import { ColonyEnum, IOption } from "../../../utils/types";

export interface IChatNavHookProps {
  colonies: IOption[];
  colony: IOption | undefined;
  handleSetColony: (option: IOption<ColonyEnum>) => void;
  toggleReport: React.Dispatch<SetStateAction<boolean>>;
}

export type ChatNavProps = IChatNavHookProps & {
  setScreen: () => void;
  isFull: boolean
}
