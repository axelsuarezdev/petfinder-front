import { createBrowserRouter,RouterProvider} from "react-router-dom";
import { createRoot } from "react-dom/client";

import React from "react";
import { RecoilRoot } from "recoil";
import { Layout } from "./Layout";
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { PersonalData } from "./pages/header-pages/personalData";
import { ModifyPassword } from "./pages/header-pages/modifyPassword";
import { ChangePersonalData } from "./pages/header-pages/changepersonaldata";
import { ReportLostPet } from "./pages/pets-pages/reportlostpet";
import { MyReports } from "./pages/pets-pages/myreports";
import { LostPetNearby } from "./pages/pets-pages/lostpetnearby";

export function AppRoutes(){
    const router = createBrowserRouter([
        {
          path: "/",
          element: <Layout />,
          children: [
            {
              index: true,
              element: <Home />,
            },
            {
              path: "login",
              element: <Login />,
            },
            {
              path: "register",
              element: <Register/>
            },{
              path: "personalData",
              element: <PersonalData/>,
            },
            {
              path: "personalData/modifyPassword",
              element: <ModifyPassword/>
            },
            { 
            path: "personalData/changePersonalData",
            element: <ChangePersonalData/>
            },
            {
              path: "reportLostPet",
              element: <ReportLostPet/>
            },
            {
              path: "myReports",
              element: <MyReports/>
            },
            {
              path: "lostPetNearby",
              element: <LostPetNearby/>
            }
          ],
        },
      ]);
      const container = document.getElementById("hello-example");
  const root = createRoot(container);
  root.render(
    <RecoilRoot>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </RecoilRoot>
  );
}