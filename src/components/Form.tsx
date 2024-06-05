import React, { useState } from "react"
import css from "./Form.css";
import { useRecoilState } from "recoil";
import {useNavigate} from "react-router-dom"
import {  userData} from "../hooks/state";
import loginImg from "../components/images/login.svg"


export function Form(props) {
  // En las props recibe la información necesaria para adaptarse a un 
  // Form de tipo "Login" y uno tipo "Register"
  // En los props recibe su handleSubmit
  // props.type = true/false. 
  // true = login | false = register
  console.log("Form component called")
  const navigate = useNavigate();
  const [userDataState, setUserData] = useRecoilState(userData);
  const [formData, setFormData] = useState({ email: "", password: "", retryPassword: "" });

  const returnIfRegister = (type)=>{
if (type === false){
  console.log("Register case")
  return <input className={`${css.inputs} ${css.retryPassword}`} name="retryPassword" type="password" required/>

} else if (type === true){
  console.log("Login case")
}
  }
  return (
    <div className={css.main__container}>
    <img src={loginImg} className={css.img}/>
    <h1 className={css.h1}>{props.type === true? "Iniciar Sesión": "Registrarse"}</h1>
    <p className={css.p}>{props.type === true? "Ingresá los siguientes datos para iniciar sesión": "Ingresá los siguientes datos para crear tu cuenta"}</p>
    <form className={css.form} onSubmit={props.handleSubmit}>
          <label className={css.labels}>Ingrese su email aquí</label>
          <input className={`${css.inputs} ${css.inputEmail}`} name="email"  type="email"  required/>
                       
          <label className={css.labels}>Contraseña</label>
          <input className={`${css.inputs} ${css.inputPassword}`} name="password" type="password"   required/>
          
          <label style={props.type === true?{display:"none"}:{display: "inherit"}} className={css.labels} >Vuelve a ingresar tu contraseña</label>
          {returnIfRegister(props.type)}
          <button className={css.button}>{props.type === true? "Iniciar Sesión": "Registrarse"}</button>
    </form>
    <span  className={css.forgetPassword} onClick={props.type === true? ()=>{navigate("/register")}:()=>{navigate("/forgetPassword")}}>{props.type === true? "Aún no tienes cuenta?, Regístrate!": "Olvidé mi contraseña"}</span>
</div>
  );
}
