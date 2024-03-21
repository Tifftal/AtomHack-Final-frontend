/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  ColonyEnum,
  ColonyPathEnum,
  ICommand,
  IHeltheData,
  IManageData,
  IMessage,
  IOption,
  ISessionDataClose,
  ISessionDataOpen,
  ISystemsData,
  sysType,
} from "../../../utils/types";
import axios, { AxiosResponse } from "axios";
import Stomp from "stompjs";

export const useColony = (
  setAdditionalCommandMessage: Dispatch<SetStateAction<IMessage | undefined>>,
  addMessage: (m: IMessage) => void,
  message: string
) => {
  const [colony, setColony] = useState<IOption<ColonyEnum>>();
  const [actions, setActions] = useState<
    {
      active: boolean;
      action?: () => Promise<void>;
    }[]
  >();
  const [isLoading, setIsloading] = useState(true);
  const prevColony = useRef<IOption<ColonyEnum> | null>(null);
  const sessionRef = useRef<string | null>(null);
  const isAccessOrManage = useRef<string | null>(null);

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
    stompClient.current?.subscribe(
      `/topic/events/${sessionRef.current}`,
      onMessage
    );
  };

  const onDisconnect = () => {
    console.log("WS disconected");
  };

  const onMessage = (message: Stomp.Message) => {
    // @ts-ignore
    console.log(message);
    const parsed = JSON.parse(message.body);

    addMessage({
      content: parsed.message,
      time: "sv",
      // isHref: false,
    } as IMessage);
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
        fio: "Ayushiev Timur Olegovich",
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
    if (!colony) return;
    const response = await axios.get(
      `https://${ColonyPathEnum[colony.value]}/api/health-check/servers`
    );
    return response;
  };

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

    // @ts-ignore
    const { data } = await haltheChack();
    console.log(data);
    if (data) {
      setActions([
        { active: data.access === "OK", action: accessHandler },
        { active: data.management === "OK", action: managmentHandler },
        { active: data.mlServer === "OK", action: () => sendToMl(message) },
        { active: data.mailServer === "OK", action: undefined },
      ]);
    } else {
      setActions([
        { active: false, action: undefined },
        { active: false, action: undefined },
        { active: false, action: undefined },
        { active: false, action: undefined },
      ]);
    }

    setIsloading(false);
  };

  useEffect(() => {
    changeColony();

    return () => {
      stompClient.current && stompClient.current.disconnect(onDisconnect);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colony]);

  async function getSystems() {
    if (!colony) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response: any = await axios.post<unknown, ISystemsData>(
      `https://${ColonyPathEnum[colony.value]}/api/systems`
    );
    console.log(response.data);
    const newArr = response.data.systems.map((sys: sysType) => {
      switch (sys) {
        case "IMS 3.0":
          return "IMS_3";
        case "IMS 4.0":
          return "IMS_4";
        case "MDP 2.0":
          return "MDP_2";
        case "UTS":
          return "UTS";
      }
    });
    console.log(newArr);
    return newArr;
  }

  async function getManage(system: string) {
    if (!colony) return;
    return axios.get<unknown, IManageData>(
      `https://{ColonyPathEnum[colony.value]}/api/management?system=${system}&sessionId=${sessionRef.current}`
    );
  }

  async function getAccess(system: string) {
    if (!colony) return;
    return axios.get<unknown, IManageData>(
      `https://${
        ColonyPathEnum[colony.value]
      }/api/access?system=${system}&sessionId=${sessionRef.current}`
    );
  }

  async function accessHandler() {
    const systems: string[] = await getSystems();
    if (!systems) return;
    isAccessOrManage.current === "access";
    const commands: ICommand[] = systems.map((sys) => ({
      action: () => systemsHandler(sys),
      label: sys,
    }));
    setAdditionalCommandMessage({ content: commands, time: "sdcd" });
  }

  async function managmentHandler() {
    const systems: string[] = await getSystems();
    if (!systems) return;
    isAccessOrManage.current === "manage";
    const commands: ICommand[] = systems.map((sys) => ({
      action: () => systemsHandler(sys),
      label: sys,
    }));
    setAdditionalCommandMessage({ content: commands, time: "sdcd" });
  }

  async function systemsHandler(system: string) {
    if (isAccessOrManage.current === "manage") {
      // @ts-ignore
      const { data } = await getManage(system);
      if (data) {
        const { url } = data;
        console.log(url);
      }
    } else {
      // @ts-ignore
      const { data }: any = await getAccess(system);
      if (data) {
        const { url } = data;
        addMessage({ content: url, time: "sv", isHref: true } as IMessage);
      }
    }
  }

  async function sendToMl(message: string) {
    if (!colony) {
      return;
    }
    // @ts-ignore
    const { data } = await axios.post(
      `https://${ColonyPathEnum[colony.value]}/api/send-to-ml?sessionId=${
        sessionRef.current
      }`,
      {
        message: message + "dvd",
      }
    );
  }

  /*  */

  /*  */

  return {
    colony,
    handleSetColony,
    colonies,
    isLoading,
    actions,
  };
};
