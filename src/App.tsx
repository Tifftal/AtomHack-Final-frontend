import '@mantine/core/styles.css';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Auth from './pages/Auth/Auth';
import Registration from './pages/Registration/Registration';
import { MantineProvider, createTheme, MantineColorsTuple } from '@mantine/core';

const myColor: MantineColorsTuple = [
  "#f2f0ff",
  "#e0dff2",
  "#bfbdde",
  "#9b98ca",
  "#7d79ba",
  "#6a65b0",
  "#605bac",
  "#504c97",
  "#464388",
  "#3b3979"
];

const theme = createTheme({
  primaryColor: 'main',
  colors: {
    'main': myColor,
  }
});

function App() {
  return (
    <MantineProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Auth />} />
          <Route path='/registration' element={<Registration />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>

  )
}

export default App
