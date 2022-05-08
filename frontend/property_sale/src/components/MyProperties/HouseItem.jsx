import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import Select from './Select'
// import axiosInstance from '../utils/axiosInstance'
import axiosLinks from '../../axiosLinks';
import { usePopup } from '../../Hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {solid} from '@fortawesome/fontawesome-svg-core/import.macro';
import useAxios from '../../Hooks/useAxios.js'
export default function HouseItem({info}) {
    const axiosInstance = useAxios();

    const {showPopup} = usePopup()
    const [isVisible,setIsVisible] = useState(info.status && info.status.toLowerCase() === "up");
    
    const onChangeHandler = (e) => {
        console.log(e.target.value);
        (   
            async function(){
                try{
                    const res = await axiosInstance.put(`${axiosLinks.updateHouseStatus}${info.id}/`,{status : e.target.value});
                    console.log(res);
                    showPopup('status changed successfully');
                    setIsVisible(prev => !prev)
                }catch(err){
                    console.log(err)
                }
            }
        )()
    }


  return (
    <tr className="item item-house">
        <td className="title">
            <Link to = {`${info.id}`}>{info.title}</Link>
        </td>
        <td className={`is_visible `}>
            <div className = {`visible ${(info.is_active && isVisible) ? "yes-visible" : "not-visible"}`}>
                {
                    info.is_active && isVisible  ? 
                        <div>
                            <FontAwesomeIcon icon = {solid('circle-check')} />
                        </div> :
                        <div>
                            <FontAwesomeIcon icon = {solid('circle-xmark')} />
                        </div>
                }
            </div>
        </td>
        <td className={`is_active `}>
            <div className = {`status ${info.is_active ? "published" : "pending"}`}>
                {
                    info.is_active ? 
                        <div>
                            <FontAwesomeIcon icon = {solid('circle-check')} />
                        </div> :
                        <div>
                            <FontAwesomeIcon icon = {solid('circle-xmark')} />
                        </div>
                }
            </div>
        </td>
        <td className="change_status" width = "10%">
            <Select 
                name = "status"
                options = {["Up","Down"]}
                value = {info.status}
                onChange= {onChangeHandler}
            />
        </td>
    </tr>
  )
}
