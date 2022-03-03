import  { createContext,useState } from "react";

export const PopupContext = createContext();

export const PopupContextProvider = ({children}) => {
    const [PopupVisible, setPopupVisible] = useState(0);
    const [PopupMsg, setPopupMsg] = useState("");
    const [PopupType,setPopupType] = useState("");
    
    function createPopup(msg){
        
    }

    function showPopup(msg,PopupType="success") {
        createPopup(msg);
        setPopupVisible(1);
        setPopupMsg(msg);
        setPopupType(PopupType);
        console.log('shown popup')
    }

    function hidePopup() {
        setPopupVisible(0);
        console.log('hidden popup')
    }
    

    return(
        <PopupContext.Provider value = {{
            PopupVisible,
            showPopup,
            setPopupVisible,
            PopupMsg,
            hidePopup,
            PopupType
        }}>
            {children}
        </PopupContext.Provider>
    )
}