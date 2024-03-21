/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useEffect, useState } from "react";
import { ColonyEnum, IOption } from "../../../utils/types";

import Stomp from "stompjs";
import SockJS from "sockjs-client";

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

  /* const stompClient = useRef<Client | null>(null); */
  const [stompClient, setStompClient] = useState<Stomp.Client>();

  const onConnected = () => {
    // подключаемся)))
    console.log("WS connected");
    stompClient?.subscribe("/chatroom/public", onMessage);
  };

  const onDisconnect = () => {
    console.log("WS disconected");
  };

  const onMessage = (message: Stomp.Message) => {
    console.log(message.body);
  };
  /* 
  const sendMessage = () => {
    // угадай по названию
    if (stompClient.current !== null) {
      if (currentMessage.trim() !== "") {
        const newDate = new Date();
        const newMessage = {
          username: myName,
          message: currentMessage.trim(),
          date: newDate.toLocaleString(),
        };
        stompClient.current.send(
          "/app/message",
          {},
          JSON.stringify(newMessage)
        );
        setCurrentMessage("");
      }
    }
  }; */

  /* const chatMessages = (payload) => {
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
    setStompClient(undefined);
  };

  useEffect(() => {
    if (!colony) return;
    console.log("sldkvnsdv", colony);

    const socket = new window.SockJS("http://localhost:8082/api/ws");
    const stomp = Stomp.over(socket);
    setStompClient(stomp);

    stomp.connect({}, () => {
      console.log("WebSocket connected");
      stomp.subscribe(
        "/topic/commands/4",
        (message) => {
          console.log(JSON.parse(message.body));
        },
        onError
      );
    });
    /* getHistoryOfChat(); */ // первичная загрузка сообщений (не помню)
    return () => {
      stompClient && stompClient.disconnect(onDisconnect);
    };
  }, [colony]);

  return {
    colony,
    handleSetColony,
    colonies,
  };
};
