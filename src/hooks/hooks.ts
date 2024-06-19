import { userData } from "./state";
import { useRecoilState } from "recoil";

const API_BASE_URL =  "https://petfinder-back-fgn4.onrender.com";
// process.env.PORT ||

export async function optimizedFetch(url, method, headers, body?) {
    try {
      const response = await fetch(API_BASE_URL + url, {
        method: method,
        headers: headers,
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json().catch(()=> response.text());
      console.log(data);
      return data; // Retornar los datos correctamente
    } catch (error) {
      console.error("Error en optimizedFetch:", error);
      throw error;
    }
  }

export async function register(userSignupData){
    console.log(API_BASE_URL + "/createUser?");
   return optimizedFetch(
        "/createUser",
        "POST",
        { "content-type": "application/json" },
        {
          email: userSignupData.email,
          password: userSignupData.password,
        }
      ).then((res) => {
        console.log(res);
        if (
          res == "Falta email y/o password" ||
          res == "Email ya usado" ||
          res ==
            "Auth ya existente, chequear base de datos ya que no debería hacer así"
        ) {
          // window.alert(res);
          return {message: res};
        } else {
          // Si logra crear la cuenta, que al mismo tiempo inicie sesión actualizando estos datos
          // const [userDataState, setUserData] = useRecoilState(userData);
          // // Actualizar el átomo userData con los datos obtenidos
          // setUserData({
          //     ...userDataState,
          //     token: res.token,
          //     email: userSignupData.email
          // });
          window.alert("Cuenta creada!");
          return {
            message: "Cuenta creada!",
            token: res.token,
          };
        }
      });
    
    //   console.log(response);
  
}
export async function signIn(userSignInData) {
  console.log("Function signIn called");

  try {
    const res = await optimizedFetch(
      "/auth",
      "POST",
      { "content-type": "application/json" },
      {
        email: userSignInData.email,
        password: userSignInData.password,
      }
    );

    if (res === "password o email incorrecta") {
      return { message: res };
    } else {
      console.log(res);
      // Actualiza el estado u otra lógica aquí
      window.alert("¡Sesión iniciada!");
      return {
        message: "¡Sesión iniciada!",
        token: res.token,
        email: userSignInData.email,
        name: res.name,
        location: res.location,
      };
    }
  } catch (error) {
    console.error("Error:", error);
    window.alert("¡Ocurrió un error al iniciar sesión! Por favor, intenta de nuevo más tarde.");
    return { message: "Error al iniciar sesión" };
  }
}
export async function modifyPassword(newPassword, token) {

  console.log("modifyPassword recibió:", newPassword, token);
  return optimizedFetch(
    "/modifyPassword",
    "PUT",
    {
      "content-type": "application/json",
      authorization: "bearer " + token,
    },
    { newPassword }
  ).then((res) => {
    console.log(res);
    window.alert(res);
  });
}
export async function modfiyPersonalData(newData, token) { 
  console.log("modifyPersonalData function recibió: ", newData, token);
  return optimizedFetch(
    "/modifyData",
    "PUT",
    {
      "content-type": "application/json",
      authorization: "bearer " + token,
    },{
      name: newData.name,
      location: newData.location,
    }
  ).then((res) => {
    console.log(res);
    if (res == "Datos del usuario modificados exitosamente.") {
      window.alert(res);
      return res;
    }
  });
}
export async function initGetAccount(){
  console.log("initGetAccount");
  const localData = localStorage.getItem("ultraSecretPetFinderAccountData") as string;
  if (localData) {
    const localDataParseado = JSON.parse(localData);
    if (localDataParseado.token && localDataParseado.token !== "") {
      console.log("Account found!: ", localDataParseado);
      return localDataParseado;
    }
  }
  console.log("Account not found or incomplete!");
}
export async function initSetAccount(accountData){
  console.log("initSetAccount recibió: ", accountData);
  localStorage.setItem("ultraSecretPetFinderAccountData", JSON.stringify(accountData));

}
export async function sendLostPetReport(reportData, token){
  console.log("sendLostPetReport recibió: ", reportData, token);
    return optimizedFetch(
      "/reportPublication",
      "POST",
      {
        "content-type": "application/json",
        authorization: "bearer " + token,
      },
      {reportData}
    ).then((res) => {
      console.log(res);
        return res;
    });
}
export async function getMyReports(token){
  try{
    return optimizedFetch(
      "/getMyReports",
       "GET",
         {
      "content-type": "application/json",
      authorization: "bearer " + token,
    }
    ).then((res)=>{
      console.log(res)
      return res;
    })
  } catch (e){
    if (e){
      return window.alert("Error: "+ e);
    }
  }
}
export async function getNearbyPets(coords, token){
console.log("getNearbyPets recibió: ", coords, "y ", token)
return optimizedFetch(`/getNearbyPets/${coords}`, "GET", {
  "content-type": "application/json",
  authorization: "bearer "+ token,
}).then((res)=>{
  console.log(res)
  return res;
})
}
export async function updateReport(reportData, token){
  console.log("updateReport recibió: ", reportData, token)
    return optimizedFetch(
      "/updateReport",
      "PUT",
      {
        "content-type": "application/json",
        authorization: "bearer " + token,
      },
      {reportData}
    ).then((res) => {
      console.log(res);
        return res;
    });
  }
export async function checkAPI(){
  try {
    const response = await fetch(API_BASE_URL + "/check", {
      method: "GET",
      headers: { "content-type": "application/json" },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json().catch(()=> response.text());
    console.log(data);
    return data; // Retornar los datos correctamente
  } catch (error) {
    console.error("Error en optimizedFetch:", error);
    throw error;
  }
}