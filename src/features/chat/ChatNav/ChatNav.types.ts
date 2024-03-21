import { SetStateAction } from "react";
import { ColonyEnum, IOption } from "../../../utils/types";

export interface IChatNavProps {
  colonies: IOption[];
  colony: IOption | undefined;
  handleSetColony: (option: IOption<ColonyEnum>) => void;
  toggleReport: React.Dispatch<SetStateAction<boolean>>
}
