import React, { useState, useEffect } from "react";
import css from "./reportPetForm.css"
import insertImg from "../images/unknown.png"
// import Dropzone from "dropzone"
import Dropzone from "dropzone";
import { Mapbox } from "./mapbox";
import { sendLostPetReport } from "../../hooks/hooks";
import { userData } from "../../hooks/state";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
export function ReportPetForm(props){
    const navigate = useNavigate();
    const [dropZone, setDropZone] = useState("");
    const [coordinates, setCoordinates] = useState({});
    const [imageURL, setImageURL] = useState("");
    const [userDataState, setUserDataState] = useRecoilState(userData)

    useEffect(() => {
        const myDropzone = new Dropzone(".replaceImg", {
            url: "/falsa",
            autoProcessQueue: false,
            paramName: "file",
            maxFilesize: 1, // mb
            resizeWidth: 350,
            resizeHeight: 150,
            resizeMethod: 'contain'
    });

        myDropzone.on("thumbnail", function (file) {
            setImageURL(file.dataURL);
            
        });
        return () => {
            myDropzone.off("thumbnail");
            myDropzone.destroy(); // Limpiar Dropzone cuando el componente se desmonte
        };
    }, []);
    const handleSubmit = async (e)=>{
        console.log("reportPet handleSubmit")
        e.preventDefault();
        if (imageURL != ""){

            let name = e.target.name.value;
            let location = e.target.location.value;
            let reportData = {
                name,
                location,
                pictureURL: imageURL,
                coordinates: coordinates,
                email: userDataState.email
            }
            console.log(name, location, "coordinates: ", coordinates, "token: ", userDataState.token)
            sendLostPetReport(reportData, userDataState.token).then((e)=>{
                    window.alert(e.message);
                    // En el futuro debe ir hacia mis mascotas reportadas
                    navigate("/myReports")
            })
        } else {
            window.alert("Debes ingresar una imagen");
        }
        // coordinates
      }
return (
<form className={css.form} onSubmit={handleSubmit} id="form">
    <div style={{width: "100%", display: "flex", flexDirection: "column"}}>
        <label className={css.label}>NOMBRE</label>
        <input type="text" name="name" style={{height: "30px"}}></input>
    </div>
    <img className="replaceImg" src={insertImg} id="picture" alt="Sube la foto de tu mascota" style={{borderRadius: "5px"}}/>
    <Mapbox coordinates={props.coordinates} somethingChange={setCoordinates}></Mapbox>
    <h3>Buscá un punto de referencia para reporta la mascota. Por ejemplo, la ubicación donde lo viste por última vez.</h3>
    <div style={{width: "100%", display: "flex", flexDirection: "column"}}>
        <label>UBICACIÓN</label>
        <input type="text" name="location" style={{height: "30px"}}/>
        <button className={css.button}>Reportar mascota</button>
    </div>
   </form>
)
}
