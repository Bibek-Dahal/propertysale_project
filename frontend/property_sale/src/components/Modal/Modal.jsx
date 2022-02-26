import React,{useState, useEffect, useRef} from 'react'
import ReactDom from 'react-dom';
import usePopup from '../../Hooks/usePopup';

export default function Modal() {
    const {PopupVisible,PopupMsg,hidePopup} = usePopup();   

    useEffect(() => {
        const interval = setInterval(() => {
            hidePopup()
        },5000)

        return () => {
            console.log('modal unmounted')
            clearInterval(interval)
        }
    },[])

    if(!PopupVisible) return null;
    return(
        ReactDom.createPortal(
                <React.Fragment>
                    <div className="popup "  >
                        {PopupMsg}
                    </div> )
                </React.Fragment>
            ,document.getElementById('portal') 
        )
        
    )
}

// ReactDom.createPortal(
//     <React.Fragment>
//         <div className="popup " >
//             {PopupMsg}
//         </div> )
//     </React.Fragment>
// ,document.getElementById('portal') 
// )