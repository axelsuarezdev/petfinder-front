import React, { useEffect, useState } from "react"
import css from "./lostpetnearby.css";
import { useRecoilState } from "recoil";
import {useNavigate} from "react-router-dom"
// import { login, userData } from "../hooks/state";
import beach from "../components/images/beach.png"
import { ReportPetForm } from "../../components/reports-related/reportPetForm";
import { userData, login } from "../../hooks/state";
import {  getNearbyPets,  } from "../../hooks/hooks";
// import { initGetAccount } from "../hooks/hooks";

export function LostPetNearby() {

  // Necesito una call, que me tire toda la data, y a partir de eso me genere las weas
 
  const [isLogin, setIsLogin] = useRecoilState(login)
  const [userDataState, setUserData] = useRecoilState(userData);
  const [nearByPets, setnearByPets] = useState([])
  const [selectedPet, setSelectedPet] = useState({name: "", id: "", email: ""});
  const [thankYouMessage, setThankYouMessage] = useState(false); // Estado para el mensaje de agradecimiento

  const navigate = useNavigate();
  const currentLocation = `${window.location.origin}${window.location.pathname}`;
  console.log(currentLocation);
  const thankyouLocation = `${currentLocation}thankyou`;


  // Rastrear mascotas cerca
  const fetchMyPets = async ()=>{
    try {
      navigator.geolocation.getCurrentPosition(
          (position) => {
            // Acceso exitoso a la ubicación
            console.log("Ubicación obtenida:", position.coords.latitude, position.coords.longitude);
            let coords = `${position.coords.latitude}, ${position.coords.longitude}`; 
            getNearbyPets(coords, userDataState.token).then((e)=>{
              console.log("res: ", e);
              if (!e.message){
                  setnearByPets(e)
              }
            });
          },
          (error) => {
            // Error al obtener la ubicación
            console.error("Error al obtener la ubicación:", error);
          }
        );
    }
    catch (e){
      console.error("Error al obtener reportes", e)
    };
  }

  const checkIfPopup = ()=>{
    if (selectedPet.id != ""){
      console.log("reportPopUp true")
      // devuelve todo 
      return (<div className={css.popUp__container}>
      <button className={css.close} onClick={()=>{setSelectedPet({name: "", id: "", email: ""})}}>X</button>
      <h1 className={css.h1}>Reportar info de {selectedPet.name}</h1>
      <form action={`https://formsubmit.co/${selectedPet.email}`} method="POST" className={css.form}>
      <input type="hidden" name="_captcha" value="false"></input>
      <input type="hidden" name="_subject" value={`Nuevo reporte sobre ${selectedPet.name}!`}></input>
      <input type="hidden" name="_next" value={thankyouLocation}></input>
      <input type="hidden" name="_template" value="box"></input>
        <label className={css.label}>NOMBRE
        <input name="name" className={css.inputs} style={{height: "45px"}} type="text" />
        </label>
        <label className={css.label} htmlFor="">TELÉFONO
        <input name="phone" className={css.inputs} style={{height: "45px"}} type="number" />
        </label>
        <label className={css.label} htmlFor="">¿DÓNDE LO VISTE?
        <textarea name="info" className={css.inputs} style={{height: "155px", resize: "none"}}></textarea>
        </label>
        <button className={css.sendButton}>Enviar información</button>
      </form>
  </div>)
    }
    else {
      console.log("reportPopUp false")
    }
  }
  
  useEffect(() => {
   
      if (isLogin === true){
        fetchMyPets();
      } else if (isLogin === false){
        navigate("/login")
      }
  }, []);
  return (
    <div style={{ display: "flex", flexDirection: "column", padding: "20px" }}>
    <h1 className={css.h1}>Mascotas perdidas cerca</h1>
    {nearByPets.length === 0 ? (
      // Si myReports está vacío, muestra solo el mensaje y el botón
      <>
        <h3 style={{alignSelf: "center"}}>No hay reportes de una mascota perdida cerca</h3>
        {/* <p>Si has reportado? Reinicia la página!</p> */}
      </>
    ) : (
      // Si myReports no está vacío, mapea cada reporte y muestra los elementos correspondientes
      nearByPets.map((report, index) => (
        <div className={css.container__pet} key={index}>
          <img className={css.petImg} src={report.pictureURL} alt="MascotitaPerdida" />
          <div className={css.container__inner}>
            <div className={css.container__inner_text}>
            <h2 className={css.h2}>{report.name}</h2>
            <h3 className={css.h3}>{report.location}</h3>
            </div>
          <button onClick={()=>{setSelectedPet({name: report.name, id: report.id, email: report.email})}} className={css.button}>Reportar</button>
          </div>
          {/* Mostrar otros detalles del reporte aquí */}
        </div>
      ))
    )}
    {checkIfPopup()}
    <button onClick={fetchMyPets} className={css.button} style={{ backgroundColor: "#7f8fff", width: "200px" }}>
          Volver a buscar
    </button>
  </div>
  )
}
