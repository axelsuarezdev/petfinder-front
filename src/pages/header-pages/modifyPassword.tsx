import React, { useEffect, useState } from "react"
import css from "./modifyPassword.css";
import { useRecoilState } from "recoil";
import {useNavigate} from "react-router-dom"
import {  userData, login} from "../../hooks/state";
import loginImg from "../components/images/login.svg"
import { Form } from "../../components/Form";
import { initSetAccount, modifyPassword } from "../../hooks/hooks";

// 

export function ModifyPassword() {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useRecoilState(login)
    const [userDataState, setUserDataState] = useRecoilState(userData)
    console.log(userDataState.email)
    
    useEffect(()=>{
        if (isLogin === false){
            navigate("/")
        }
    }, []);
    const handleSubmit = async (e)=>{
        console.log("modifyPassword handleSubmit")
        e.preventDefault();
        let password = e.target.password.value;
        let retryPassword = e.target.retryPassword.value;
        console.log(retryPassword, password)
       if (password == retryPassword){
        modifyPassword(password, userDataState.token).then((res:any)=>{window.alert(res)})
    }
       else {
        window.alert("Las contraseñas no coinciden")
       }
      }
  return (
    <div className={css.main__container}>
        <h1 className={css.h1}>Cambiar contraseña</h1>
        <form className={css.form} onSubmit={handleSubmit}>
                <label className={css.labels}>NUEVA CONTRASEÑA</label>
                <input className={css.inputs} name="password" required/>

                <label className={css.labels}>CONFIRMAR CONTRASEÑA</label>
                <input className={css.inputs} name="retryPassword" required/>
                
                <button className={css.button}>Cambiar Contraseña</button>
          </form>
    </div>
  );
}
