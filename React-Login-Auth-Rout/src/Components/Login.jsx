import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {login,AddJwt,RemoveJwt,Addrole} from '../Store/userSlice'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import axios from 'axios'


const Login = () => {
  const [username,Setusername] = useState('');
  const [password,Setpassword] = useState('');
  const dispatch = useDispatch();
  const useStore = useSelector((state) =>({...state}))

  const users ={
    user:username,
    pass:password
  };


  const verifyToken = (token) =>{
    try{
      //console.log(token);
      const tokenParts = token.split('.');
      if (tokenParts.length === 3) {
        const payload = JSON.parse(atob(tokenParts[1]));
        //console.log('Decoded Payload:', payload);
        const expirationDate = new Date(payload.exp * 1000);
        const userRole = payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
        dispatch(Addrole(userRole));
        //console.log('Role:', userRole);
        if(expirationDate > Date.now()){
          return true;
        }
      } else {
        console.error('Invalid JWT format');
      }
    }catch (error){
      return false;
    }
  };



  // useEffect(() =>{
  //   const token = localStorage.getItem('jwtToken');
  //   if (verifyToken(token)){
  //     dispatch(AddJwt(token));
  //     //console.log("token: ",token);
  //   }else{
  //     dispatch(AddJwt(""));
  //   }
  // },[])


  const handleLogin = async (event)=>{
  try{
      event.preventDefault();
      dispatch(login(users));
      const response  = await axios.post('http://localhost:7071/api/Auth/login',{
      username:username,
      password:password,
      role:'',
      });
      const token = response .data;
      console.log("Status: ",response .status);
      if(response.status === 200){
        //localStorage.setItem('jwtToken', token);
        dispatch(AddJwt(token));
        console.log("Login",useStore.authorize.username);
      }else{
        dispatch(RemoveJwt());
        Setusername('');
        Setpassword('');
        localStorage.setItem('jwtToken', "");
      }
   
      //console.log("Login",useStore.authorize.password);
  
  }catch(e){
    console.log(e);
    Setusername('');
    Setpassword('');
    dispatch(RemoveJwt());
    localStorage.setItem('jwtToken', "");
  }
  }

  useEffect(()=>{

  },[])
  return (
    <div className="loginForm">
      <form onSubmit={handleLogin}>
        <div><h2>LOGIN</h2></div>
        <div>
          <input type="text" value={username} onChange={e =>Setusername(e.target.value)} />
        </div>
        <div>
          <input type="password" value={password} onChange={e =>Setpassword(e.target.value)} />
        </div>
        <div>
          <button type="submit" >
            <span>Login</span>
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login
