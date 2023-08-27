import {NavLink} from 'react-router-dom'
import  './Nav.css'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { RemoveJwt } from '../Store/userSlice'
import { useDispatch } from 'react-redux'
const Login = () => {
  const auth= useSelector((state) =>({...state}));
  const dispatch = useDispatch();


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
        {(auth.authorize.Isauthentication) 
         ?<span>{auth.authorize.Role}</span>
         : <span>Guest</span>
        }
   </nav>
  )
}

export default Login
