import React, { useEffect, useState } from "react"
import css from "./Button.css";
import { useRecoilState } from "recoil";
import {useNavigate} from "react-router-dom"

export function Button(props){
return (<button className={css.button} 
    style={{backgroundColor: props.color}} 
    onClick={props.onClick}>{props.children}</button>);
}