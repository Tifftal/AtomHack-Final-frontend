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

export enum ColonyPathEnum {
  Aquarium = "aquarion.cry1s.ru",
  GreenLabyrinth = "greenlab.cry1s.ru",
  Terramorf = "terramorf.cry1s.ru",
  Crystallia = "authatom.cry1s.ru",
  DesertVortex = "dustwind.cry1s.ru",
}

export interface ISessionDataClose {
  timestamp: string;
  sessionId: string;
}

export interface ISessionDataOpen {
  timestamp: string;
  sessionId: string;
  pattern: "OPEN_SESSION";
}
