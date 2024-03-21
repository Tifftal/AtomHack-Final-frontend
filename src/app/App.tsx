import '@mantine/core/styles.css';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Auth from '../pages/Auth/Auth';
import Registration from '../pages/Registration/Registration';
import { MantineProvider } from '@mantine/core';
import { theme } from './ThemeProvider';
import MainPage from '../pages/MainPage/MainPage';
import Navbar from '../widgets/Navbar/Navbar';
import NotFound from '../pages/NotFound/NotFound';
import ChatBtn from '../enteties/ChatBtn/ChatBtn';
import { Chat } from '../widgets/Chat/Chat';


function App() {
  return (
    <MantineProvider theme={theme}>
      <BrowserRouter>
        <Navbar />
        <ChatBtn />
        <Routes>
          <Route path='/auth' element={<Auth />} />
          <Route path='/registration' element={<Registration />} />
          <Route path='/' element={<MainPage />} />
          <Route path='*' element={<NotFound />} />
          <Route path='/chat' element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>

  )
}

export default App
