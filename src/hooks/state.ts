import { atom , selector} from "recoil";
export const login = atom({
    key: "login",
    default: false,
  });
export const userData = atom({
    key: "userData",
    default: {
        token: "",
        name: "",
        location: "",
        email: "No has iniciado sesión"
    }
})
