import {NavLink} from 'react-router-dom'
import  './Nav.css'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { RemoveJwt } from '../Store/userSlice'
import { useDispatch } from 'react-redux'
const Login = () => {
  const auth= useSelector((state) =>({...state}));
  const dispatch = useDispatch();

  const handleLogout =()=>{
   ;
    console.log("removeJwt");
  }
  return (
    <nav>
        <NavLink end to="/" ><p>Login</p></NavLink>
        <NavLink  to="/Carcare" ><p>Carcare</p></NavLink>
        {(auth.authorize.Isauthentication) 
         ?<>
           <NavLink  to="/maintain" ><p>Maintain</p></NavLink>
           <NavLink onClick={()=> dispatch(RemoveJwt())} ><p >Logout</p></NavLink> 
         </> 
        :  <></>
      }
    </nav>
  )
}

export default Login
