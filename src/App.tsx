import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import './styles/App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import History from './pages/History'
import Navbar from './components/Navbar'
import { createContext, useEffect, useState } from 'react'
import { UserData, UserContextType } from './types/main'
import Cookies from 'js-cookie';
import axios from 'axios'


export const UserDataContext = createContext<UserContextType | undefined>(undefined);

function App() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isAuth, setIsAuth] = useState<boolean>(false);


  // Check for current api key
  useEffect(()=>{
    let apiKey = Cookies.get("user-api-token");
    let uid = Number(Cookies.get("uid"));
    if (apiKey && uid){
      setIsAuth(true);
      axios.get(import.meta.env.VITE_BACKEND_URL + "/users", {headers:{"x-api-key":apiKey}})
      .then(result =>{
        console.log(result)
      })
    }
    else {
      setIsAuth(false)
    }
    
  }, [])

  return (
    <UserDataContext.Provider value={{userData, setUserData}}>
      <div id="App">
        <Navbar />
        <div style={{marginTop: '3em'}}>
          <BrowserRouter>
            <Routes>
              <Route index element={<Navigate to="home/"/>} />
              <Route path='home/' element={<Home />} />
              <Route path='login/' element={<Login />} />
              <Route path='dashboard/' element={<Dashboard />} />
              <Route path='history/' element={<History />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </UserDataContext.Provider>
  )
    
}

export default App
