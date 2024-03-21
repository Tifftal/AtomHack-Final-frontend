import { ColonyEnum, IMessage, IOption } from "../../../utils/types";

export interface IChatBlockProps {
  messages: IMessage[];
  colony?: IOption<ColonyEnum>;
}
