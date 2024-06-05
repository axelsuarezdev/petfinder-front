import React, { useEffect, useState } from "react"
import css from "./modifyPassword.css";
import { useRecoilState } from "recoil";
import {useNavigate} from "react-router-dom"
import {  userData, login} from "../../hooks/state";
import loginImg from "../components/images/login.svg"
import { Form } from "../../components/Form";
import { initSetAccount, modfiyPersonalData } from "../../hooks/hooks";

// 

export function ChangePersonalData() {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useRecoilState(login);
    const [userDataState, setUserDataState] = useRecoilState(userData);
    useEffect(()=>{
        if (isLogin === false){
            navigate("/")
        }
    }, []);
    const handleSubmit = (e)=>{
      console.log("changePersonalData handleSubmit")
        e.preventDefault();
        let name = e.target.name.value;
        let location = e.target.location.value;
        console.log(name, location);
        modfiyPersonalData({name: name, location: location}, userDataState.token).then((res)=>{
          if (res === "Datos del usuario modificados exitosamente."){
            let fulfillUserData = {
              ...userDataState,
              name: name, 
              location: location
            }
            setUserDataState(fulfillUserData)
            initSetAccount(fulfillUserData);
          }
        });    
    }
  return (
    <div className={css.main__container}>
        <h1 className={css.h1}>Datos personales</h1>
        <form className={css.form} onSubmit={handleSubmit}>
                <label className={css.labels}>NOMBRE</label>
                <input placeholder={userDataState.name}className={css.inputs} name="name" required/>

                <label className={css.labels}>LOCALIDAD</label>
                <input placeholder={userDataState.location} className={css.inputs} name="location" required/>
                
                <button className={css.button}>Guardar</button>
        </form>
    </div>
  );
}
