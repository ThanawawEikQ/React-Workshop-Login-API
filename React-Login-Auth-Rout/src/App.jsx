import { useSelector } from 'react-redux/es/hooks/useSelector'
import './App.css'
import {BrowserRouter,Route,Router} from 'react-router-dom'
import Login from './Components/Login'
import Nav from './Components/Nav'

function App() {
  const users = useSelector((state) =>({...state}))
  //console.log("result user: ",users.authorize);

  return (
    <BrowserRouter>
      <Nav/>
     <Login/>
    </BrowserRouter>
  )
}

export default App
