import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import './styles/App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import History from './pages/History'
import Navbar from './components/Navbar'
import { createContext, useEffect, useState, useContext } from 'react'
import { UserData, UserContextType } from './types/main'
import Cookies from 'js-cookie';
import axios from 'axios'


const UserDataContext = createContext<UserContextType | undefined>(undefined);

export function useUserDataContext() {
  const context = useContext(UserDataContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
}

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

  if (isAuth){
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
  } else {
    return (
      <div id="App">
        <BrowserRouter>
            <Routes>
              <Route index element={<Navigate to="login/"/>} />
              <Route path='home/' element={<Home />} />
              <Route path='login/' element={<Login />} />
            </Routes>
          </BrowserRouter>
      </div>
    )
  }
    
}

export default App
