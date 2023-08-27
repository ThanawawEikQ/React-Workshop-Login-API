import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    Isauthentication: false,
    Role:"",
    IsActiveName:"",
    username:"",
    password:"",
    Jwt:"",
  }
  export const Userslice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        login:(state,action) =>{
           if(action.user != ""&&action.pass !=""){
            state.username = action.payload.user;
            state.password =action.payload.pass;
           }
        },
        AddJwt:(state,action) =>{
          state.Jwt = action.payload;
          if(state.Jwt !=""){
            state.Isauthentication = true;
          }else{
            state.Isauthentication = false;
          }
        },
        Addrole:(state,action) =>{
          state.Role = action.payload;
        },
        RemoveJwt:(state) =>{
          console.log("removeJwt");
          state.Isauthentication = false;
          state.username= "";
          state.password ="";
          state.Jwt ="";
          state.Role = "";
        }
    }
  })
  export const {login,AddJwt,RemoveJwt,Addrole} = Userslice.actions

  export default Userslice.reducer