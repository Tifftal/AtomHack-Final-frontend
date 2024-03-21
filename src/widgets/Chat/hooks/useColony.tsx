/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ColonyEnum,
  ColonyPathEnum,
  IMessage,
  IOption,
  ISessionDataClose,
  ISessionDataOpen,
} from "../../../utils/types";
import axios, { AxiosResponse } from "axios";
import Stomp from "stompjs";

export const useColony = () => {
  const [colony, setColony] = useState<IOption<ColonyEnum>>();
  const [isLoading, setIsloading] = useState(true);
  const prevColony = useRef<IOption<ColonyEnum> | null>(null);
  const sessionRef = useRef<string | null>(null);

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
    (option: IOption<ColonyEnum>) => {
      prevColony.current = colony || null;
      setColony(option);
    },
    [colony]
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

  const openSession = async (url: string, fio: string) => {
    const response = await axios.post<unknown, AxiosResponse<ISessionDataOpen>>(
      url,
      {
        fio: fio,
      }
    );
    sessionRef.current = response.data.sessionId;
    return response.data.sessionId;
  };

  const closeSession = async (url: string, session: string) => {
    const response = await axios.post<
      unknown,
      AxiosResponse<ISessionDataClose>
    >(url, {
      sessionId: session,
    });
    return response.data.sessionId;
  };

  const haltheChack = async () => {
    await axios.get("")
  }

  const createConnection = async () => {
    if (!colony || colony.value === ColonyEnum.Terramorf) return;

    if (stompClient.current) {
      if (!prevColony.current?.value || !sessionRef.current) return;
      await closeSession(
        `https://${ColonyPathEnum[prevColony.current.value]}/api/session/close`,
        sessionRef.current
      );
      await stompClient.current.disconnect(onDisconnect);
    }

    const session = await openSession(
      /* `http://${ColonyPathEnum[colony.value]}/api/session/open`, */
      `https://${ColonyPathEnum[colony.value]}/api/session/open`,
      "kabanets vladimir" // todo
    );

    const socket = new window.SockJS(
      `https://${ColonyPathEnum[colony.value]}/api/ws`
    );
    const stomp = Stomp.over(socket);
    stompClient.current = stomp;

    stomp.connect({}, onConnected, onError);
  };

  const changeColony = async () => {
    setIsloading(true);
    await createConnection();

    await haltheChack();

    setIsloading(false);
  };

  useEffect(() => {
    changeColony();

    return () => {
      stompClient.current && stompClient.current.disconnect(onDisconnect);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colony]);

  return {
    colony,
    handleSetColony,
    colonies,
    isLoading,
  };
};
