export interface ICommand {
  label: string;
  action?: () => void;
  disabled?: boolean;
}

export interface IMessage {
  colony?: IOption<ColonyEnum>
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
  Crystallia = "crystalia.cry1s.ru",
  DesertVortex = "dustwind.cry1s.ru",
}
/* export enum ColonyPathEnum {
  Aquarium = "31.129.109.44:8001",
  GreenLabyrinth = "31.129.109.44:8002",
  Terramorf = "31.129.109.44:8003",
  Crystallia = "31.129.109.44:8004",
  DesertVortex = "31.129.109.44:8005",
} */

export interface ISessionDataClose {
  timestamp: string;
  sessionId: string;
}
export type sysType = "IMS 3.0" | "IMS 4.0" | "MDP 2.0" | "UTS";
export interface ISystemsData {
  systems: sysType[];
}

export interface ISessionDataOpen {
  timestamp: string;
  sessionId: string;
  pattern: "OPEN_SESSION";
}

export interface IManageData {
  url: string;
}

export interface IHeltheData {
  access: string;
  management: string;
  mlServer: string;
  mailServer: string;
}
