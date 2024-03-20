export interface ICommand {
  label: string;
  action: () => void;
  disabled?: boolean;
}

export interface IMessage {
  isUserMessage?: boolean;
  time: string;
  content: string | ICommand[];
}

export interface IFile {
  file: File;
  id: number;
}

export interface IOption<T = string> {
  label: string;
  value: T;
}

export enum ColonyEnum {
  Aquarium = "Aquarium",
  GreenLabyrinth = "GreenLabyrinth",
  Terramorf = "Terramorf",
  Crystallia = "Crystallia",
  DesertVortex = "DesertVortex",
}
