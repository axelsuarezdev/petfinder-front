import React, { useEffect, useState } from "react"
import css from "./reportlostpet.css";
import { useRecoilState } from "recoil";
import {useNavigate} from "react-router-dom"
// import { login, userData } from "../hooks/state";
import beach from "../components/images/beach.png"
import { ReportPetForm } from "../../components/reports-related/reportPetForm";
// import { initGetAccount } from "../hooks/hooks";

export function ReportLostPet() {
  
  useEffect(() => {
  }, []);
  return (
    <div style={{display: "flex", flexDirection: "column", padding: "20px"}}>
        <h1 className={css.h1}>Reportar Mascota</h1>
        <h3 className={css.h3}>Ingresá la siguiente información para realizar el reporte de la mascota</h3>
        <ReportPetForm/>
        <button className={css.button}>Cancelar</button>
    </div>
  );
}
