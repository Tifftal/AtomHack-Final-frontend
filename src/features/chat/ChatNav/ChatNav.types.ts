import { ColonyEnum, IOption } from "../../../utils/types";

export interface IChatNavProps {
  colonies: IOption[];
  colony: IOption | undefined;
  handleSetColony: (option: IOption<ColonyEnum>) => void;
}
