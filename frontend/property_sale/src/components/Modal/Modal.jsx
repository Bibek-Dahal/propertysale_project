import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React,{useState, useEffect, useRef} from 'react'
import ReactDom from 'react-dom';
import usePopup from '../../Hooks/usePopup';
import './Modal.css';

import {solid,regular} from '@fortawesome/fontawesome-svg-core/import.macro';

export default function Modal() {
    const [showModal,setShowModal] = useState(false);
    const {PopupVisible,PopupMsg,hidePopup,PopupType} = usePopup();   
    const Popup = useRef(null);

    const decoratePopUp = () => {
        switch(PopupType){
            case "success":
                return <FontAwesomeIcon icon={solid('circle-check')}/>
            default:
                return "";
        }
    }


    // if(!PopupVisible) return null;
    return(
        ReactDom.createPortal(
                <React.Fragment>
                    <div ref = {Popup} onAnimationEnd = {hidePopup} className={`popup ${PopupType} ${PopupVisible ? "show" : "hide"}`}>
                        <div className="icon">
                            {
                                decoratePopUp()
                            }
                            <span className="close">
                                <FontAwesomeIcon icon = {solid('times')}/>
                            </span>
                        </div>
                        <span className="text">
                            {PopupMsg}
                        </span>
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