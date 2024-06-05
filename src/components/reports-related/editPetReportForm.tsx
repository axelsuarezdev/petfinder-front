import React, { useState, useEffect } from "react";
import css from "./reportPetForm.css"
import insertImg from "../images/unknown.png"
// import Dropzone from "dropzone"
import Dropzone from "dropzone";
import { Mapbox } from "./mapbox";
import { sendLostPetReport, updateReport } from "../../hooks/hooks";
import { userData } from "../../hooks/state";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
export function EditReportForm(props){
    const navigate = useNavigate();
    const [dropZone, setDropZone] = useState("");
    const [coordinates, setCoordinates] = useState({});
    const [userDataState, setUserDataState] = useRecoilState(userData)
    const [imageURL, setImageURL] = useState("");
    const [name, setName] = useState(props.name);
    const [location, setLocation] = useState(props.location)
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
        // let name = e.target.name.value;
        // let location = e.target.location.value;
        let reportData:{
            name: string;
            location: string;
            coordinates: object,
            id: string,
            pictureURL?: string
        } = {
            name: name,
            location: location,
            coordinates: coordinates,
            id: props.id
        }
        if (imageURL !== ""){
            reportData.pictureURL = imageURL;
        }
        console.log(name, location, "coordinates: ", coordinates, "token: ", userDataState.token)
        updateReport(reportData, userDataState.token).then((e)=>{
            window.alert(e.message);
            // En el futuro debe ir hacia mis mascotas reportadas
            props.closePopup();
            props.fetchMyReports();
    })
    }
return (
<form className={css.form} onSubmit={handleSubmit} id="form">
    <div style={{width: "100%", display: "flex", flexDirection: "column"}}>
        <label className={css.label}>NOMBRE</label>
        <input  placeholder={name} value={name} onChange={(e)=> setName(e.target.value)} type="text" name="name" style={{height: "30px"}}></input>
    </div>
    <img className="replaceImg" src={props.pictureURL} id="picture" alt="Sube la foto de tu mascota" style={{borderRadius: "5px", height: "30vh"}}/>
    <Mapbox coordinates={props.coordinates} somethingChange={setCoordinates}></Mapbox>
    <h3>Actualiza el punto de referencia. Por ejemplo, la ubicación donde lo viste por última vez.</h3>
    <div style={{width: "100%", display: "flex", flexDirection: "column"}}>
        <label>UBICACIÓN</label>
        <input placeholder={location} value={location} onChange={(e)=> setLocation(e.target.value)} type="text" name="location" style={{height: "30px"}}/>
        <button className={css.button}>Actualizar Reporte</button>
    </div>
   </form>
)
}
