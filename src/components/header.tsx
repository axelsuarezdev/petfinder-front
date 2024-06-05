import React, { useState } from "react"
import css from "./header.css";
import { useRecoilState } from "recoil";
import {useNavigate} from "react-router-dom"
import { login, userData } from "../hooks/state";
import icon from "../components/images/logo.svg"
import { initSetAccount } from "../hooks/hooks";


export function Header() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useRecoilState(login)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userDataState, setUserDataState] = useRecoilState(userData)
  const signOut = ()=>{ 
    let emptyUserData = {
    token: "",
    name: "",
    location: "",
    email: "No iniciaste sesión",
  }
    setUserDataState(emptyUserData)
    initSetAccount(emptyUserData);
    setIsLogin(false);
    window.alert("Sesión cerrada")
    navigate("/")
  }
  function contentIfLogin(){
    if (isLogin === true){
      //Un button
      return <div className={css.data__container}>
          <button className={css.button} onClick={signOut}>CERRAR SESIÓN</button>
          <h2 className={css.h2__email}>{userDataState.email}</h2>
      </div>
    }else if(isLogin===false){
        return <h2 className={css.h2__email}>{userDataState.email}</h2>
    }
  }
  const checkAndNavigate = (url: string)=>{
    if (isLogin === true){
      console.log(url)
      navigate(url)
    } else if (isLogin === false){
      navigate("/login")
    }
  }
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <header className={css.navbar}>
      <img src={icon} className={css.icon} onClick={()=>{navigate("/")}}/>
      <div className={css.hamburger} id="hamburger" onClick={toggleMenu}>
        <div className={css.bar}></div>
        <div className={css.bar}></div>
        <div className={css.bar}></div>
      </div>
      <ul className={`${css.menu} ${isMenuOpen ? css.active : ''}`} id="menu">
        <li>
          <a  className={css.personalData} onClick={()=>{checkAndNavigate("/personalData")}}>
            Mis Datos
          </a>
        </li>
        <li>
          <a  className={css.lostPets} onClick={()=>{
            checkAndNavigate("/myReports")
          }}>
            Mis mascotas reportadas
          </a>
        </li>
        <li>
          <a  className={css.reportPet} onClick={()=>{
            checkAndNavigate("/reportLostPet")
          }}>
            Reportar mascota
          </a>
        </li>
        {/* Acá hay que chequear si inició sesión y agregar cosas */}
        {contentIfLogin()}
      </ul>
    </header>
  );
}
