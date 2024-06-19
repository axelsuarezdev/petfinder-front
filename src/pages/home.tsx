import React, { useEffect, useState } from "react"
import css from "./home.css";
import { useRecoilState } from "recoil";
import {useNavigate} from "react-router-dom"
import { login, userData } from "../hooks/state";
import beach from "../components/images/beach.png"
import { getNearbyPets, initGetAccount, checkAPI } from "../hooks/hooks";
import { Button } from "../ui/Button";

export function Home() {
  const [isLogin, setIsLogin] = useRecoilState(login)
  const [userDataState, setUserData] = useRecoilState(userData);
  const [checkApiState, setCheckAPIState] = useState(false);
  const navigate = useNavigate();
  const checkAndNavigate = (url: string)=>{
    if (isLogin === true){
      console.log(url)
      navigate(url)
    } else if (isLogin === false){
      navigate("/login")
    }
  }
  useEffect(() => {
    // Un checkeo para controlar la cantidad de veces que fuera a chequear la API el usuario.
    if (checkApiState === false){
      checkAPI().then((res)=>{
        console.log(res)
        setCheckAPIState(true)
      })
    }
    initGetAccount().then((accountFinded) => {
      if (accountFinded && accountFinded.token) {
        setUserData(accountFinded);
        setIsLogin(true);
      }
    });
  }, []);
  return (
    <div className={css.main__container}>
        <img src={beach} className={css.img}/>
         <h1 className={css.h1}>Pet Finder App</h1>
          <p className={css.p}>Encontrá y reportá mascotas perdidas cerca de tu ubicación</p>
          {/* Este botón te pide permiso para obtener tu ubicación geografica
          y hace un fetch para sacar las mascotas que estén perdidas cerca
          !!!FALTA HACER EL ENDPOINT(CREO) */}
          <Button onClick={checkAndNavigate("/lostpetnearby")} color="#00A884">Dar mi ubicación actual</Button>
          <Button redirect="" color="#7f8fff">¿Cómo funciona Pet Finder?</Button>
          {/* <button className={`${css.button} ${css.location}`} onClick={()=>{checkAndNavigate("/lostpetnearby")}}>Dar mi ubicación actual</button>
          <button className={`${css.button} ${css.howitworks}`}>¿Cómo funciona Pet Finder?</button> */}
    </div>
  );
}
