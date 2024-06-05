import React, { useState } from "react"
import css from "./login.css";
import {useNavigate} from "react-router-dom"
import loginImg from "../components/images/login.svg"
import { signIn, initSetAccount} from "../hooks/hooks";
import { userData, login  } from "../hooks/state";
import { useRecoilState } from "recoil";
import { Form } from "../components/Form";

export function Login() {
  console.log("component Login called")
  const navigate = useNavigate();
  const [userDataState, setUserData] = useRecoilState(userData);
  const [isLogin, setIsLogin] = useRecoilState(login)
  const handleSubmit = async (e)=>{
    console.log("Login handleSubmit")
    e.preventDefault();
    let email = e.target.email.value;
    let password = e.target.password.value;
    console.log(email, password)
    signIn({email: email, password: password}).then((res: any)=>{
      // CASO 1: SESIÓN INICIADA | res: 
      if (res.message === "¡Sesión iniciada!"){
        let fulfillUserData = {
          token: res.token,
          email: email,
          name: res.name,
          location: res.location
        }
        setUserData(fulfillUserData);
        initSetAccount(fulfillUserData)
        setIsLogin(true);
        navigate("/")
      }
      // CASO 2: PASSWORD O EMAIL INCORRECTA
      else if (res.message === "password o email incorrecta"){
        window.alert("Contraseña o email incorrecto")
      }
      // if (res === "Sesión iniciada!"){
      else{
        window.alert(res)
      }
      // }
    })
  }
  return (
    <Form handleSubmit={handleSubmit} type={true}></Form>
  )
}
