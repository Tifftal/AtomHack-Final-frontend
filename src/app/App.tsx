import '@mantine/core/styles.css';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Auth from '../pages/Auth/Auth';
import Registration from '../pages/Registration/Registration';
import { MantineProvider } from '@mantine/core';
import { theme } from './ThemeProvider';
import MainPage from '../pages/MainPage/MainPage';

function App() {
  return (
    <MantineProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Auth />} />
          <Route path='/registration' element={<Registration />} />
          <Route path='/main' element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>

  )
}

export default App
