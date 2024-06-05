import React, { useState,useEffect } from "react";

import { Outlet, useNavigate,} from "react-router-dom";
import { Header } from "./components/header";
import { useRecoilState } from "recoil";
import { login, userData } from "./hooks/state";
import { initGetAccount } from "./hooks/hooks";

import css from "./Layout.css";
function Layout() {
  const navigate = useNavigate();
  const checkAndNavigate = (url: string)=>{
    if (isLogin === true){
      console.log(url)
      navigate(url)
    } else if (isLogin === false){
      navigate("/login")
    }
  }
  const [isLogin, setIsLogin] = useRecoilState(login)
  const [userDataState, setUserData] = useRecoilState(userData);
  useEffect(() => {
    initGetAccount().then((accountFinded) => {
      if (accountFinded && accountFinded.token) {
        setUserData(accountFinded);
        setIsLogin(true);
      }
    });
  }, []);
  return (
    <div className={css.main__container}>
      <Header />
      <Outlet />
    </div>
  );
}

export { Layout };