import  { createContext,useState } from "react";

export const PopupContext = createContext();

export const PopupContextProvider = ({children}) => {
    const [PopupVisible, setPopupVisible] = useState(0);
    const [PopupMsg, setPopupMsg] = useState("");
    
    function createPopup(msg){
        
    }

    function showPopup(msg) {
        createPopup(msg);
        setPopupVisible(1);
        setPopupMsg(msg);
        console.log('shown popup')
    }

    function hidePopup() {
        setPopupVisible(0);
    }
    

    return(
        <PopupContext.Provider value = {{
            PopupVisible,
            showPopup,
            setPopupVisible,
            PopupMsg,
            hidePopup
        }}>
            {children}
        </PopupContext.Provider>
    )
}