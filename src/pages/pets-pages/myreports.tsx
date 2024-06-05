import React, { useEffect, useState } from "react"
import css from "./myreports.css";
import { useRecoilState } from "recoil";
import {useNavigate} from "react-router-dom"
// import { login, userData } from "../hooks/state";
import { userData } from "../../hooks/state";
import { getMyReports } from "../../hooks/hooks";
import { EditReportForm } from "../../components/reports-related/editPetReportForm";
// import { initGetAccount } from "../hooks/hooks";

export function MyReports() {
  // Necesito una call, que me tire toda la data, y a partir de eso me genere las weas
  const [userDataState, setUserData] = useRecoilState(userData);
  const [myReports, setMyReports] = useState([])
  const [selectedPet, setSelectedPet] = useState({name: "", id: "", location: "", last_seen_coordintes: {lat: "", lng: ""}, pictureURL: ""});

  const closePopup = () => {
    setSelectedPet({
      name: "", id: "", location: "", last_seen_coordintes: { lat: "", lng: "" }, pictureURL: ""
    });
  }
  const fetchMyReports = async ()=>{
    try {
      const reports = await getMyReports(userDataState.token);
      if (!reports.message){
        setMyReports(reports);
      }
    }
    catch (e){
      console.error("Error al obtener reportes", e)
    };
  }
  const checkIfPopup = ()=>{
    if (selectedPet.id != ""){
      console.log("reportPopUp true");
      // devuelve todo 
      return (<div className={css.popUp__container}>
      <button className={css.close} onClick={closePopup}>X</button>
      <EditReportForm closePopup={closePopup} fetchMyReports={fetchMyReports} location={selectedPet.location} name={selectedPet.name} id={selectedPet.id} last_seen_coordintes={selectedPet.last_seen_coordintes} pictureURL={selectedPet.pictureURL} />
  </div>)
    }
    else {
      console.log("reportPopUp false")
    }
  }
  useEffect(() => {
    fetchMyReports();
  }, []);
  return (
    <div style={{ display: "flex", flexDirection: "column", padding: "20px", alignItems: "center" }}>
    <h1 className={css.h1}>Mascotas reportadas</h1>
    {myReports.length === 0 ? (
      // Si myReports está vacío, muestra solo el mensaje y el botón
      <>
        <h3>Aún no reportaste mascotas perdidas</h3>
        <p>Si has reportado? Reinicia la página!</p>
      </>
    ) : (
      // Si myReports no está vacío, mapea cada reporte y muestra los elementos correspondientes
      myReports.map((report, index) => (
        <div className={css.container__pet} key={index}>
          <img className={css.petImg} src={report.pictureURL} alt="MascotitaPerdida" />
          <div className={css.container__inner}>
            <div className={css.container__inner_text}>
            <h2 className={css.h2}>{report.name}</h2>
            <h3 className={css.h3}>{report.location}</h3>
            </div>
          <button onClick={()=>{setSelectedPet({name: report.name, id: report.id, location: report.location, last_seen_coordintes: report.last_seen_coordintes, pictureURL: report.pictureURL})}} className={css.button}>Editar</button>
          </div>
          {/* Mostrar otros detalles del reporte aquí */}
        </div>
      ))
    )}
    {checkIfPopup()}
    <button className={css.button} style={{ backgroundColor: "#7f8fff", width: "80%" }}>
          Publicar reporte
    </button>
  </div>
  )
}
