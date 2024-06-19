import React, { useState } from "react"
import css from "./register.css";
import { useRecoilState } from "recoil";
import {useNavigate} from "react-router-dom"
import { login, userData} from "../hooks/state";
import loginImg from "../components/images/login.svg"
import { initSetAccount, register } from "../hooks/hooks";
import { Form } from "../components/Form";
export function Register() {
  console.log("Register component called")
  const navigate = useNavigate();
  const [userDataState, setUserData] = useRecoilState(userData);
  const [isLogin, setIsLogin] = useRecoilState(login)
 
  const handleSubmit = (e)=>{
    console.log("Register handleSubmit")
    e.preventDefault();
    console.log("e.target: ", e.target)
    let email = e.target.email.value;
    let password = e.target.password.value;
    let retryPassword = e.target.retryPassword.value;
    console.log (email, password, retryPassword)
  if (password == retryPassword){
       register({email: email, password: password}).then((res: any)=>{
      // CASO 1: CUENTA CREADA
      if (res.message== "Cuenta creada!"){
        let fulfillUserData = {
          token: res.token,
          email,
          name: "",
          location: ""
        }
        console.log(fulfillUserData);
        setUserData(fulfillUserData);
        initSetAccount(fulfillUserData);
        setIsLogin(true);
        navigate("/");
      }
      //CASO 2: FALLO
      else if(!res.token){
        window.alert(res)
      }
    })   
  }
  else {
    window.alert("Las contraseñas deben ser iguales")
  }
   
  }
  return (
    <Form handleSubmit={handleSubmit} type={false}></Form>
  );
}
