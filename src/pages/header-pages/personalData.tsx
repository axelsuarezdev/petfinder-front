import React, { useEffect, useState } from "react"
import css from "./personalData.css";
import { useRecoilState } from "recoil";
import {useNavigate} from "react-router-dom"
import {  userData, login} from "../../hooks/state";
import loginImg from "../components/images/login.svg"
import { initSetAccount } from "../../hooks/hooks";

// Esta "page" es una SPA interna,

export function PersonalData() {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useRecoilState(login)
    const [userDataState, setUserDataState] = useRecoilState(userData)
    console.log(userDataState.email)
    useEffect(()=>{
        if (isLogin === false){
            navigate("/")
        }
    },[]);
    const signOut = ()=>{
        let emptyUserData = {
            token: "",
            name: "",
            location: "",
            email: "No iniciaste sesión",
          }
        setUserDataState(emptyUserData)
        initSetAccount(emptyUserData);
        setIsLogin(false)
        window.alert("Sesión cerrada")
        navigate("/")
      }
  return (
    <div className={css.main__container}>
        <h1 className={css.h1}>Mis datos</h1>
        <div className={css.button__containers}>
            <button onClick={()=>{navigate("/personalData/changePersonalData")}} className={`${css.button} ${css.modfiyPersonalData}`}>Modificar datos personales</button>
            <button onClick={()=>{navigate("/personalData/modifyPassword")}} className={`${css.button} ${css.modifyPassword}`}>Modificar contraseña</button>
        </div>
        <div className={css.data__container}>
            <h2>{userDataState.email}</h2>
            <button className={css.signOut} onClick={signOut}>CERRAR SESIÓN</button>
        </div>
    </div>
  );
}
