import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import './styles/App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import History from './pages/History'
import Navbar from './components/Navbar'

function App() {

  return (
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
  )
}

export default App
