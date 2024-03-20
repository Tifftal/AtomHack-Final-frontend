import { useCallback, useState } from "react";
import { ColonyEnum, IOption } from "../../../utils/types";

export const MAX_FILES_LENGTH = 5;

export const useColony = () => {
  const [colony, setColony] = useState<IOption<ColonyEnum>>();

  const colonies: IOption[] = [
    {
      label: "Акварион",
      value: ColonyEnum.Aquarium,
    },
    {
      label: "Зеленый лабиринт",
      value: ColonyEnum.GreenLabyrinth,
    },
    {
      label: "Терраморф",
      value: ColonyEnum.Terramorf,
    },
    {
      label: "Кристаллия",
      value: ColonyEnum.Crystallia,
    },
    {
      label: "Пустынный Вихрь",
      value: ColonyEnum.DesertVortex,
    },
  ];

  const handleSetColony = useCallback(
    (option: IOption<ColonyEnum>) => setColony(option),
    []
  );

  return {
    colony,
    handleSetColony,
    colonies,
  };
};
