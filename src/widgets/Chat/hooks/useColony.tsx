/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ColonyEnum,
  ColonyPathEnum,
  IMessage,
  IOption,
} from "../../../utils/types";

import Stomp from "stompjs";

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

  const stompClient = useRef<Stomp.Client | null>(null);

  const onConnected = () => {
    console.log("WS connected");
    stompClient.current?.subscribe("/chatroom/public", onMessage);
  };

  const onDisconnect = () => {
    console.log("WS disconected");
  };

  const onMessage = (message: Stomp.Message) => {
    console.log(message.body);
  };

  // todo
  const sendMessage = (message: IMessage) => {
    if (!stompClient.current) return;
    stompClient.current.send("/app/message", {}, JSON.stringify(message));
  };

  /*  const chatMessages = (payload) => {
    // слушаем сервер и добавляем в chatHistory
    console.log(payload);
    const payloadData = JSON.parse(payload.body);
    console.log(payloadData);
    setChatHistory((prev) => [
      ...prev,
      {
        username: payloadData.username,
        message: payloadData.message,
        date: payloadData.date,
      },
    ]);
  }; */

  const onError = () => {
    console.log("WS error");
    stompClient.current = null;
  };

  const createConnection = async () => {
    if (!colony || colony.value === ColonyEnum.Terramorf) return;

    const socket = new window.SockJS(
      `http://${ColonyPathEnum[colony.value]}/api/ws`
    );
    const stomp = Stomp.over(socket);
    stompClient.current = stomp;

    stomp.connect({}, onConnected, onError);
  };

  useEffect(() => {
    createConnection();

    return () => {
      stompClient.current && stompClient.current.disconnect(onDisconnect);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colony]);

  return {
    colony,
    handleSetColony,
    colonies,
  };
};
