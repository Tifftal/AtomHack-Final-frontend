import { createTheme, MantineColorsTuple } from '@mantine/core';

export const greenTheme: MantineColorsTuple = [
  "#EBFBEE",
  "#D3F9D8",
  "#B2F2BB",
  "#8CE99A",
  "#69DB7C",
  "#51CF66",
  "#40C057",
  "#37B24D",
  "#2F9E44",
  "#2B8A3E",
];
export const grapeTheme: MantineColorsTuple = [
  "#F8F0FC",
  "#F3D9FA",
  "#EEBEFA",
  "#E599F7",
  "#DA77F2",
  "#CC5DE8",
  "#BE4BDB",
  "#AE3EC9",
  "#9C36B5",
  "#862E9C",
];
export const orangeTheme: MantineColorsTuple = [
  "#FFF4E6",
  "#FFE8CC",
  "#FFD8A8",
  "#FFC078",
  "#FFA94D",
  "#FF922B",
  "#FD7E14",
  "#F76707",
  "#E8590C",
  "#D9480F",
];
export const indigoTheme: MantineColorsTuple = [
  "#EDF2FF",
  "#DBE4FF",
  "#BAC8FF",
  "#91A7FF",
  "#748FFC",
  "#5C7CFA",
  "#4C6EF5",
  "#4263EB",
  "#3B5BDB",
  "#364FC7",
];
export const redTheme: MantineColorsTuple = [
  "#FFF5F5",
  "#FFE3E3",
  "#FFC9C9",
  "#FFA8A8",
  "#FF8787",
  "#FF6B6B",
  "#FA5252",
  "#F03E3E",
  "#E03131",
  "#C92A2A",
];

export const theme = createTheme({
  primaryColor: 'grape',
  colors: {
    'green': greenTheme,
    'grape': grapeTheme,
    'orange': orangeTheme,
    'indigo': indigoTheme,
    'red': redTheme,
  }
});