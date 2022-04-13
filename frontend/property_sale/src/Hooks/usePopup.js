import { useContext } from "react";
import { PopupContext } from "../context/PopupContext";

export default function usePopup(){
    return useContext(PopupContext);
}